const mongoose = require('mongoose');
const faker = require('faker');

const Listing = require('./schema.js');

const itemsAlreadyInserted = Number(process.argv[2]) || 0;
const itemsToInsert = Number(process.argv[3]) || 5000000;
const chunk = Number(process.argv[4]) || 1000;
let inserted = 0;

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/sdc2';

const generateSlides = () => {
  const slides = [];
  const images = 6 + Math.ceil(Math.random() * 6);

  for (let i = 0; i < images; i++) {
    slides.push({
      imgPath: Math.floor(Math.random() * 100),
      description: faker.lorem.sentence()
    });
  }

  return slides;
}

const generateListing = () => {
  const listings = [];

  for (let i = 0; i < chunk; i++) {
    listings.push({
      listingId: i + itemsAlreadyInserted,
      images: generateSlides()
    });
  }

  return listings;
}

const randomizeListing = listings => {
  for (let h = 0; h < listings.length; h++) {
    listings[h].listingId = h + inserted + itemsAlreadyInserted,
    delete listings[h]._id;

    for (let i = 0; i < listings[h].images.length; i++) {
      listings[h].images[i].imgPath = Math.floor(Math.random() * 100),
      listings[h].images[i].description = faker.lorem.sentence();
    }
  }
}

mongoose
  .connect(CONNECTION_URI, { useNewUrlParser: true })
  .then(async () => {
    console.log('>>>>>>>> connected <<<<<<<<')

    const time = Date.now();

    const listings = generateListing();

    while (inserted < itemsToInsert) {
      await Listing.insertMany(listings);
      inserted += chunk;
      randomizeListing(listings);
    }

    console.log((Date.now() - time) / 1000 + 's');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });