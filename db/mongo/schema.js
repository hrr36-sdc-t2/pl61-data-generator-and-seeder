const mongoose = require('mongoose');

const slideSchema = mongoose.Schema({
  imgPath: Number,
  description: String
});

const listingSchema = mongoose.Schema({
  listingId: { type: Number, index: true },
  images: [slideSchema]
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;