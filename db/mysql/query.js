const fs = require('fs');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    database: 'sdc2'
  }
});

const field = process.argv[2] || 'listingId';
const value = process.argv[3] || '1';

const time = Date.now();

knex('images')
  .where({ [field] : value }).select()
  .then(res => {
    console.log(res);
    fs.writeFileSync('./db/mysql/output.json', JSON.stringify(res, null, 2), err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
    console.log(`found ${res.length} item${res.length > 1 ? 's' : ''} in ${Date.now() - time} ms`);
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });