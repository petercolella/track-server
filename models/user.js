const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (inputPassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputPassword, user.password, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (!result) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
