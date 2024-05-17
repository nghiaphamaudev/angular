const express = require('express');
const productController = require('./../controllers/productController');
const router = express.Router();

router
  .route('/')
  .get(productController.getALlProduct)
  .post(productController.createProduct);

router
  .route('/:id')
  .delete(productController.deleteProduct)
  .get(productController.getProduct);

module.exports = router;
