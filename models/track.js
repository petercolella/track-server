const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});

const trackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    default: ''
  },
  locations: [pointSchema]
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
