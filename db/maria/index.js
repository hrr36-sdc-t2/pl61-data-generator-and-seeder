var knex = require('knex');

knex.schema.createTable('listings', function (table) {
  table.increments('listingId').primary();
  table.string('name');
  table.timestamps();
})