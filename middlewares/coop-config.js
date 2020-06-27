const Item = require('../models/item');

module.exports = (req, res, next) => {
  try {
    Item.find({ coopId: req.params.coopId }).then((coop) => {
      const isMember = coop.members.filter((member) => member === req.body.userId);
      if (isMember === true) {
        next();
      }
      res.status(401).json({
        errorMsg: ('You\'re not authorized to make this request!')
      });
    });
    res.status(401).json({
      errorMsg: ('Cooperative Society does not exist')
    });
  } catch (error) {
    res.status(401).json({
      errorMsg: ('There was a problem uploading your item to the Cooperative Society'),
      error
    });
  }
};
