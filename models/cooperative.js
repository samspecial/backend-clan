const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const coopSchema = mongoose.Schema({
  coopName: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  agreementPath: { type: String, required: true, unique: true },
  // packagePath: { type: String, required: true, unique: true },
  slots: { type: Number, default: 1000 },
  slotsExhaustedStatus: { type: Boolean, default: false },
  activeStatus: { type: Boolean, default: true },
  closeVote: { type: Number, default: 0 },
  userId: { type: String, required: true },
  members: [{
    userId: { type: String, required: true, unique: true }
  }]
});

coopSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Coop', coopSchema);
