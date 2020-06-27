const Item = require('../models/item');

exports.addItemtoCoop = (req, res) => {
  const url = `${req.protocol}://${req.get('host')}`;
  // console.log(req.body);
  const item = new Item({
    userId: req.body.userId,
    coopId: req.params.coopId,
    description: req.body.description,
    price: req.body.price,
    imagePath: `${url}/files/cooperative/images${req.file.filename}`,
    currency: req.body.currency ? req.body.currency : 'NGN'
  });
  res.status(401).json({
    errorMsg: 'You have no Cooperative Society'
  });
  item.save().then(() => {
    res.status(201).json({
      message: 'Item added successfully to Cooperative'
    });
  }).catch((error) => {
    res.status(400).json({
      errorMsg: 'Unable to add item to Cooperative',
      error: error.message
    });
    // console.log(error);
  });
};

exports.fetchCoopItems = (req, res) => {
  Item.find({ coopId: req.params.coopId }).then((items) => {
    res.status(200).json(items);
  }).catch((error) => {
    res.status(400).json({
      errorMsg: 'Unable to fetch Cooperative Items',
      error: error.message
    });
  });
};

exports.fetchSingleCoopItem = (req, res) => {
  Item.find({ _id: req.params.itemId }).then((item) => {
    if (!item) {
      res.status(404).json({
        errorMsg: 'Item not found!'
      });
    }

    res.status(200).json(item);
  }).catch((error) => {
    res.status(400).json({
      errorMsg: 'Unable to fetch Item',
      error: error.message
    });
  });
};

exports.fetchAllItems = (req, res) => {
  Item.find().then((items) => res.status(200).json(items))
    .catch((error) => {
      res.status(400).json({
        errorMsg: 'Unable to fetch all Cooperative Items',
        error: error.message
      });
    });
};

exports.editSingleCoopItem = (req, res) => {
  Item.find({ _id: req.params.itemId }).then((item) => {
    if (!item) {
      res.status(404).json({
        errorMsg: 'Item not found!'
      });
    }

    if (item.userId === req.body.userId) {
      const url = `${req.protocol}://${req.get('host')}`;

      const itemUpdate = new Item({
        userId: req.body.userId,
        coopId: req.params.coopId,
        description: req.body.description,
        price: req.body.price,
        imagePath: `${url}/files/cooperative/images${req.file.filename}`,
        currency: req.body.currency ? req.body.currency : 'NGN'
      });

      Item.updateOne({ _id: req.params.itemId }, itemUpdate).then(() => {
        res.status(201).json({
          message: 'Item updated successfully'
        });
      }).catch((error) => res.status(401).json(error));
    }
  }).catch((error) => res.status(400).json(error));
};
