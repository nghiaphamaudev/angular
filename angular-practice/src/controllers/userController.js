const APPError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    status: 'success',
    data: users,
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new APPError('The ID user not exsited!', 400));
  }
  res.status(204).json({});
});
