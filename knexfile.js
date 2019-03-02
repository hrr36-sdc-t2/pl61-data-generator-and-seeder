module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      database: 'sdc2'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/mysql/migrations',
    },
    seeds: {
      directory: __dirname + '/db/mysql/seeds'
    }
  },

  staging: {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      database: 'sdc2'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/mysql/migrations',
    },
    seeds: {
      directory: __dirname + '/db/mysql/seeds'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      database: 'sdc2'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/mysql/migrations',
    },
    seeds: {
      directory: __dirname + '/db/mysql/seeds'
    }
  },

};