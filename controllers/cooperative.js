const Coop = require('../models/cooperative');
const User = require('../models/user');
const Forum = require('../models/forum');

exports.createCoop = (req, res) => {
  const url = `${req.protocol}://${req.get('host')}`;
  // console.log(req.body);
  const coop = new Coop({
    coopName: req.body.coopName,
    email: req.body.email,
    agreementPath: `${url}/files/cooperative/documents${req.file.filename}`,
    // packagePath: `${url}/files/cooperative/documents${req.file.filename}`,
    slot: parseInt(req.body.slot),
    userId: req.body.userId
  });

  coop.save().then(() => {
    res.status(201).json({
      message: 'Cooperative Society Created Successfully'
    });
  }).catch((error) => {
    res.status(400).json({
      errorMsg: 'Cooperative Society creation failed',
      error: error.message
    });
    // console.log(error);
  });
};

exports.fetchAllCoop = (req, res) => {
  Coop.find().then((coops) => {
    res.status(200).json(coops);
  }).catch((error) => {
    res.status(400).json(error);
  });
};

exports.fetchMyCoops = (req, res) => {
  Coop.find({ userId: req.body.userId }).then((coops) => {
    if (!coops) {
      res.status(401).json({
        errorMsg: 'You have no Cooperative Society'
      });
    }
    res.status(200).json(coops);
  }).catch((error) => {
    res.status(400).json({
      error: error.message
    });
  });
};

exports.fetchCoop = (req, res) => {
  Coop.find({ _id: req.params.coopId }).then((coop) => {
    if (!coop) {
      res.status(401).json({
        errorMsg: 'You have no Cooperative Society'
      });
    }

    res.status(200).json(coop);
  }).catch((error) => res.status(400).json(error));
};

exports.fetchCoopMembers = (req, res) => {
  Coop.find({ coopId: req.params.coopId }).then((coop) => {
    if (!coop) {
      res.status(401).json({
        errorMsg: 'Cooperative Society not found'
      });
    }
    res.status(200).json({
      members: coop.members
    });
  }).catch((error) => {
    res.status(400).json({
      error: error.message
    });
  });
};

exports.addMember = (req, res) => {
  Coop.find({ _id: req.params.coopId }).then((coop) => {
    if (!coop) {
      res.status(401).json({
        errorMsg: 'Cooperative Society not found'
      });
    }

    let newMemberId = null;
    User.find({ email: req.body.userEmail }).then((user) => {
      if (!user) {
        res.status(401).json({
          errorMsg: 'User not found'
        });
      }
      // eslint-disable-next-line no-underscore-dangle
      newMemberId = user._id;
    }).catch((error) => {
      res.status(400).json({
        error: error.message
      });
    });

    if (coop.userId === req.body.userId) {
      if (newMemberId !== null) {
        Coop.updateOne({ _id: req.params.coopId }, {
          $push: {
            members: {
              userId: newMemberId
            }
          }
        }).then(() => {
          res.status(201).json({
            message: `${req.body.email} added successfully`
          });
        }).catch((error) => {
          res.status(400).json(error);
        });
      }
    }

    res.status(401).json({
      errorMsg: `You're not authorized to add ${req.body.email} to the Cooperative society`
    });
  }).catch((error) => {
    res.status(400).json({
      error: error.message
    });
  });
};

exports.createForum = (req, res) => {
  Coop.find({ _id: req.params.coopId }).then((coop) => {
    if (!coop) {
      res.status(401).json({
        errorMsg: 'Cooperative Society not found'
      });
    }

    if (coop.userId === req.body.userId) {
      const forum = new Forum({
        // eslint-disable-next-line no-underscore-dangle
        coopId: coop._id
      });

      forum.save().then(() => {
        res.status(201).json({
          message: 'Forum created successfully'
        });
      }).catch((error) => {
        res.status(400).json(error);
      });
    }

    res.status(401).json({
      errorMsg: 'You\'re not authorized to create a forum in this Cooperative society'
    });
  }).catch((error) => res.status(400).json(error));
};

exports.forum = (req, res) => {
  Forum.find({ coopId: req.params.coopId }).then((forum) => {
    if (!forum) {
      res.status(401).json({
        errorMsg: 'Cooperative Society Forum not found'
      });
    }

    res.status(200).json(forum.forumMessages);
  }).catch((error) => {
    res.status(400).json(error);
  });
};

exports.sendMessageToForum = (req, res) => {
  Forum.find({ coopId: req.params.coopId }).then((forum) => {
    if (!forum) {
      res.status(401).json({
        errorMsg: 'Cooperative Society Forum not found'
      });
    }

    Forum.updateOne({ coopId: req.params.coopId }, {
      $push: {
        message: {
          userId: req.body.userId,
          messageBody: req.body.messageBody
        }
      }
    }).then(() => {
      res.status(201).json({
        message: 'Message sent successfully'
      });
    }).catch((error) => {
      res.status(401).json(error);
    });
  });
};
