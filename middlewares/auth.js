const jwt = require('jsonwebtoken');

const env = require('../env');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, env.TOKEN_ENCODING_STRING);
    const { userId } = decodedToken;

    if (req.body && req.body.userId !== userId) {
      res.status(401).json({
        errorMsg: ('User ID is invalid!')
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      errorMsg: ('You\'re not authorized to make this request!'),
      error
    });
  }
};
