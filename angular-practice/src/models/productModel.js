const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  imageUrl: String,
  productName: {
    type: String,
    required: [true, 'Please provide a your name product'],
  },
  productCode: String,
  releaseDate: String,
  price: {
    type: Number,
    min: 0,
    required: [true, 'Please provide a your price product'],
  },
  starRating: {
    type: Number,
    min: 0,
    default: 3.5,
  },
  description: String,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

