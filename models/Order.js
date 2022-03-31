const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: '{PATH} is required.'
  },
  status: {
    type: String,
    required: '{PATH} is required.'
  },
  total: {
    type: Number,
    required: '{PATH} is required.'
  },
  orders: {
    type: Array,
    required: '{PATH} is required.'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Orders', OrderSchema);