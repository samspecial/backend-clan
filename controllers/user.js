const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const env = require('../env');
const User = require('../models/user');

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash
    });

    user.save().then(() => {
      res.status(201).json({
        message: 'Sign up successful!'
      });
    }).catch((error) => {
      res.status(500).json({
        errorMsg: 'Sign up failed',
        error: error.message
      });
      // console.log(error);
    });
  }).catch((error) => {
    res.status(401).json({
      errorMsg: 'Wrong API call! Follow the documentation.',
      error: error.message
    });
    // console.log(error);
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(401).json({
        errorMsg: 'User not found!'
      });
    }

    bcrypt.compare(req.body.password, user.password).then((valid) => {
      if (!valid) {
        res.status(401).json({
          errorMsg: 'Login Details doesn\'t match!'
        });
      }

      const token = jwt.sign(
        // eslint-disable-next-line no-underscore-dangle
        { userId: user._id },
        env.TOKEN_ENCODING_STRING,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        // eslint-disable-next-line no-underscore-dangle
        userId: user._id,
        token
      });
    }).catch((error) => {
      res.status(401).json({
        errorMsg: 'An error occured',
        error: error.message
      });
    });
  }).catch((error) => {
    res.status(401).json({
      errorMsg: 'An error occured',
      error: error.message
    });
    // console.log(error);
  });
};
