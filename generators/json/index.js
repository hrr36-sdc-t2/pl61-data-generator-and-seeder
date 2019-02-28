const fs = require('fs');
const faker = require('faker');

const listings = process.argv[2] || 10;
const slides = process.argv[3] || 10;

fs.writeFile('./generators/json/data.json', '[', err => {
  if (err) { console.log(err);}
});

const stream = fs.createWriteStream('./generators/json/data.json', {'flags': 'a'});

for (let h = 0; h < listings; h++) {
  for (let i = 0; i < slides; i++) {
    let comma = ',';
    let sample = {
      imgId: Math.floor(Math.random() * 100),
      listingId: h,
      imgOrder: i,
      description: faker.fake("{{random.words}}, {{random.words}}, {{random.words}}")
    };

    if (h === listings - 1 && i === slides - 1 ) {
      comma = ''
    }

    stream.write('\n\t' + JSON.stringify(sample) + comma);
  }
}


stream.write('\n]')


