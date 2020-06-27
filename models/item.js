const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const itemSchema = mongoose.Schema({
  userId: { type: String, required: true },
  coopId: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: String, required: true },
  image: { type: String, required: true },
  currency: { type: String, default: 'NGN' }
});

itemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', itemSchema);
