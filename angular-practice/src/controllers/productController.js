const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const APPError = require('./../utils/appError');

exports.getALlProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'success',
    products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id);

  console.log(product);
  // if (!product) {
  //   return next(new APPError('The product ID not existed!', 404));
  // }
  res.status(200).json({
    status: 'success',
    product,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    newProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({});
});
