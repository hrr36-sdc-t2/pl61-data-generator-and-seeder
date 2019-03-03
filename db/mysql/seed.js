const faker = require('faker');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    database: 'sdc2'
  }
});

const itemsAlreadyInserted = Number(process.argv[2]) || 0;
const itemsToInsert = Number(process.argv[3]) || 2500000;
const chunk = Number(process.argv[4]) || 1000;

let listingInserted = 0;
let imagesInserted = 0;

const generateListing = () => {
  const listings = [];

  for (let i = 0; i < chunk; i++) {
    listings.push({
      listingId: null,
    });
  }

  return listings;
};

const generateSlides = () => {
  const slides = [];
  const count = chunk / 10;

  for (let i = 0; i < count; i++) {
    const images = 6 + Math.ceil(Math.random() * 6);
    const listingId = itemsAlreadyInserted + i + 1;

    for (let j = 0; j < images; j++) {
      slides.push({
        listingId,
        imgPath: Math.floor(Math.random() * 100),
        description: faker.lorem.sentence()
      });
    }
  }

  return slides;
};

const randomizeSlides = slides => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].listingId = String(Number(slides[i].listingId) + chunk / 10);
    slides[i].imgPath = Math.floor(Math.random() * 100),
    slides[i].description = faker.lorem.sentence();
  }
};

const insertListing = async listings => {
  while (listingInserted < itemsToInsert) {
    await knex('listings')
      .insert(listings)
      .then(() => {
        listingInserted += chunk;
        console.log(listingInserted);
      });
  }
};

const insertSlides = async slides => {
  while (imagesInserted < itemsToInsert) {
    await knex('images')
      .insert(slides)
      .then(() => {
        imagesInserted += chunk / 10;
        randomizeSlides(slides);
        console.log(imagesInserted);
      });
  }
};

const listings = generateListing();
const slides = generateSlides();
const time = Date.now();

insertListing(listings)
  .then(() => {
    insertSlides(slides)
      .then(() => {
        console.log((Date.now() - time) / 1000 + 's');
        process.exit();
      })
      .catch(err => {
        console.log(err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
