const fs = require('fs');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    database: 'sdc2'
  }
});

const time = Date.now();

knex('images')
  .where({ listingId : 54294 }).select()
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