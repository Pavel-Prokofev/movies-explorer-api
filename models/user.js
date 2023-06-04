const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const {
  orFailFunction,
} = require('../utils/errorsHandler');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then(async (user) => {
      if (!user) {
        return Promise.reject(orFailFunction('InvalidAuthorization'));
      }
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return Promise.reject(orFailFunction('InvalidAuthorization'));
      }
      return user;
    });
};

module.exports = mongoose.model('user', userSchema);
