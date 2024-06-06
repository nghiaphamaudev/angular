const AppError = require('./../utils/appError');
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = errors.join(' \n');
  return new AppError(message, 400);
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = { ...err };
  error.message = err.message;
  if (err.name === 'ValidationError') {
    error = handleValidationError(error);
  }
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
  });
};
