const mongoose = require('mongoose');

const env = require('../env');

exports.connect = (req, res, next) => {
  mongoose.connect(env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    // console.log('Connected to Mongo DB successfully!');
    next();
  }).catch((error) => {
    // console.log('Error connecting to Mongo DB!');
    res.status(500).json({
      message: 'Error connecting to Mongo DB!',
      error: error.message
    });
  });
};
