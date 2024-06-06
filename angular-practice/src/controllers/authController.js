const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const promisify = require('util');

exports.register = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return next(new AppError('The email has already existed!', 401));
  }
  const newUser = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('The email or password not correct!', 401));
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  });
  user.password = undefined;
  user.accessToken = token;
  res.status(200).json({
    status: 'success',
    data: user,
    accessToken: token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookie.jwt) {
    token = req.cookie.jwt;
  }
  if (!token) {
    return next(new AppError('You not logged! Login please'));
  }
  const decoded = await promisify(jwt.sign)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);
  if (!user) {
    return next(new AppError('The token not belonging to this account', 401));
  }
  req.user = user;
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
exports.checkLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookie.jwt) {
    try {
      const decoded = await promisify(jwt.sign)(
        req.cookie.jwt,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded._id);
      if (!currentUser) {
        return next();
      }
      return res.status(200).json({
        status: 'success',
        data: currentUser,
      });
    } catch (error) {
      return next();
    }
  }
  next();
});
