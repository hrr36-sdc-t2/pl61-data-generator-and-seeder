const mongoose = require('mongoose');

const json = require('../../generators/json/data.json');

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/sdc2';

mongoose.connect(CONNECTION_URI)
  .then(res => console.log('>>>>>>>> connected <<<<<<<<'))
  .catch(err => console.log(err));

const schema = mongoose.Schema({
  imgId: Number,
  listingId: Number,
  imgOrder: Number,
  description: String
});

const Slide = mongoose.model('Slide', schema);

Slide.collection.insertMany(json, err => {
  if (err) { console.log(err); }
})
