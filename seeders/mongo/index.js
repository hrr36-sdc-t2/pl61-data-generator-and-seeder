const mongoose = require('mongoose');

const { Slide, Listing } = require('./schema.js');

const images = process.argv[2] || 1000000;
const chunk = 20;
let inserted = 0;

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/sdc2';

const generateSlides = chunk => {
  const arr = [];

  for (let i = 0; i < chunk; i++) {
    arr.push({
      listingId: Math.floor(i / 10),
      imgPath: Math.floor(Math.random() * 100),
      description: 0
    });
  }

  return arr;
}

const randomizeSlide = (arr, inserted) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].listingId = Math.floor((i + inserted) / 10);
    arr[i].imgPath = Math.floor(Math.random() * 100);
    arr[i].description = 0;
    delete arr[i]._id;
  }
}

mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  poolSize: 10
})
  .then(async () => {
    console.log('>>>>>>>> connected <<<<<<<<')

    Slide.deleteMany({}, err => {
      if (err) { console.log(err); }
    });

    Listing.collection.deleteMany({}, err => {
      if (err) { console.log(err); }
    });

    let time = new Date(Date.now());

    const arr = generateSlides(chunk);

    while (inserted < images) {
      await Slide.insertMany(arr);
      inserted += chunk;
      randomizeSlide(arr, inserted);
    }

    console.log((Date.now() - time) / 1000, 's');
  })
  .catch(err => console.log(err));