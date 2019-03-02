const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root'
  }
});

knex.raw('CREATE DATABASE IF NOT EXISTS sdc2')
  .then(() => knex.raw('USE sdc2'))
  .then(() => knex.schema.createTable('listings', t => {
    t.increments('listingId').unsigned().primary();
  }))
  .then(() => knex.schema.createTable('images', t => {
    t.increments('imgId').unsigned().primary();
    t.integer('listingId').unsigned().index().references('listingId').inTable('listings');
    t.integer('imgPath');
    t.string('description');
  }))
  .then(() => knex.destroy())
  .catch(err => console.log(err));
