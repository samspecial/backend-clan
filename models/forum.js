const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const forumSchema = mongoose.Schema({
  coopId: { type: String, required: true, unique: true },
  forumMessages: [{
    message: {
      userId: { type: String },
      messageBody: { type: String }
    }
  }]
});

forumSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Forum', forumSchema);
