const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const validator = require('validator');
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must have a username!'],
  },
  email: {
    type: String,
    required: [true, 'User must have a email!'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password!'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'User must have a password confirm'],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'The password confirm not match with password!',
    },
  },
  photo: {
    type: String,
    default: 'user-default.jpg',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bycrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (password, userPassword) {
  return await bycrypt.compare(password, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
