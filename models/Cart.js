const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: '{PATH} is required.'
  },
  quantity: {
    type: Number,
    required: '{PATH} is required.',
    default: 1
  },
  product_id: {
    type: String,
    required: '{PATH} is required.'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: '{PATH} is required.'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Carts', CartSchema);