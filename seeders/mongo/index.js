const mongoose = require('mongoose');
const faker = require('faker');

const { Slide, Listing } = require('./schema.js');

const images = process.argv[2] || 100000000;
const chunk = 1000;
let inserted = 0;

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/sdc2';

const generateSlides = chunk => {
  const arr = [];

  for (let i = 0; i < chunk; i++) {
    arr.push({
      listingId: Math.floor(i / 10),
      imgPath: Math.floor(Math.random() * 100),
      description: faker.lorem.sentence()
    });
  }

  return arr;
}

const randomizeSlide = (arr, inserted) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].listingId = Math.floor((i + inserted) / 10);
    arr[i].imgPath = Math.floor(Math.random() * 100);
    arr[i].description = faker.lorem.sentence();
    delete arr[i]._id;
  }
}

mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  poolSize: 10
})
  .then(async () => {
    console.log('>>>>>>>> connected <<<<<<<<')

    await Slide.deleteMany({});
    await Listing.deleteMany({});

    let time = new Date(Date.now());

    const arr = generateSlides(chunk);

    while (inserted < images) {
      console.log(inserted);
      await Slide.insertMany(arr);
      inserted += chunk;
      randomizeSlide(arr, inserted);
    }

    console.log((Date.now() - time) / 1000, 's');
  })
  .catch(err => console.log(err));