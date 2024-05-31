const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const APPError = require('./../utils/appError');

exports.getALlProduct = catchAsync(async (req, res, next) => {
  const currentPage = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 6;
  const skip = currentPage * limit - limit;
  const nameProduct = await Product.find({}, 'productName -_id');
  const countPages = Math.ceil(((await Product.countDocuments()) * 1) / limit);
  const products = await Product.find().skip(skip).limit(limit);

  res.status(200).json({
    status: 'success',
    products,
    countPages,
    currentPage,
    nameProduct,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json({
    status: 'success',
    product,
  });
});

exports.getProductBySearch = catchAsync(async (req, res, next) => {
  const keySearch = req.query.keySearch;
  console.log(req.query);
  const product = await Product.findOne({ productName: keySearch });
  return res.status(200).json({
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

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    return next(new APPError('The ID Product not existed!', 401));
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
});
