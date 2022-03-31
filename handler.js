'use strict';
const connectToDatabase = require('./utils/dbConnect');
const Order = require('./models/Order');
const Cart = require('./models/Cart');
const Product = require('./models/Product');
require('dotenv').config({ path: './variables.env' });

module.exports.getOrders = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const orders = await Order.find({user_id: event.pathParameters.user_id});

    return {
      statusCode: 200,
      body: JSON.stringify(orders)
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: 'Could not fetch orders',
        description: err.message
      })
    }
  }
};

module.exports.createOrders = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  let orderBody = JSON.parse(event.body);

  try {
    await connectToDatabase();
    let totalPrice = 0;
    let orderList = [];
    const cartOrders = await Cart.find({user_id: orderBody.user_id}).populate('product')

    if (cartOrders.length == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'No products found in your cart. Please add products in your cart.'
        })
      }
    }

    let promises = cartOrders.map(async (order) => {
      if (order) {
        let total = parseInt(order.quantity) * parseInt(order.product.price);
        totalPrice += total;
  
        const product = await Product.findById(order.product_id);
        product.quantity = product.quantity - order.quantity;
        // await product.save();
  
        orderList.push({
          title: order.product.title,
          quantity: order.quantity,
          price: order.product.price,
          totalPrice: total
        });
        
        // await Cart.findByIdAndRemove(order.id);
      }
    });

    return Promise.all(promises).then(async () => {
      if (orderList.length == 0) {
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: 'Could not proceed with your order(s).'
          })
        }
      }
  
      const orders = await Order.create({
        user_id: orderBody.user_id,
        status: "Delivering",
        total: totalPrice,
        orders: orderList
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Order Success.",
          data: orders
        })
      };
    });
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: 'Could not proceed with your order(s).',
        description: err.message
      })
    }
  }
};

