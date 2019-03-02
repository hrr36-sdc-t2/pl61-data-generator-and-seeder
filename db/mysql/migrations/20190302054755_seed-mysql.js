exports.up = function(knex, Promise) {
  return knex.schema.createTable('listings', t => {
      t.increments('listingId').unsigned().primary();
    })
    .then(() => knex.schema.createTable('images', t => {
      t.increments('imgId').unsigned().primary();
      t.integer('listingId').unsigned().index().references('listingId').inTable('listings');
      t.integer('imgPath');
      t.string('description');
    }));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('listings')
    .then(() => knex.schema.dropTable('images'));
};
