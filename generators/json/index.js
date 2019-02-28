const fs = require('fs');

const count = process.argv[2] || 10;
const stream = fs.createWriteStream('./json-gen/data.json', {'flags': 'a'});

stream.write('[')

for (let i = 0; i < count; i++) {
  let comma = ',';
  let sample = {
    imgId: i,
    listingId: i,
    imgOrder: 0,
    description: ''
  };

  if (i === count - 1) {
    comma = ''
  }

  stream.write(JSON.stringify(sample) + comma);
}

stream.write(']')


