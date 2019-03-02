const mongoose = require('mongoose');
const fs = require('fs');
const Listing = require('./schema.js');

const field = process.argv[2] || 'listingId';
let value = process.argv[3] || '0';

value = field === '_id' ? mongoose.Types.ObjectId(value) : value;

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/sdc2';

mongoose
.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  poolSize: 10
})
.then(() => {
  const time = Date.now();
  Listing.find({ [field]: value })
  .then(res => {
    console.log(res);
    fs.writeFileSync('./db/mongo/output.json', JSON.stringify(res, null, 2), err => {
      if (err) {
        console.log(err);
        process.exit();
      }
    });
    console.log(`found ${res.length} item${res.length > 1 ? 's' : ''} in ${Date.now() - time} ms`);
    process.exit();
  });
})
.catch(err => {
  console.log(err);
  process.exit();
});
