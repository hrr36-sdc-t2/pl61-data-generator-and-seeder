const mongoose = require('mongoose');

const slideSchema = mongoose.Schema({
  listingId: Number,
  imgPath: Number,
  description: String
});

const listingSchema = mongoose.Schema({
  listingId: Number
});

const Slide = mongoose.model('Slide', slideSchema);
const Listing = mongoose.model('Listing', listingSchema);

module.exports.Slide = Slide;
module.exports.Listing = Listing;