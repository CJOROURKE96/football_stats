const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

module.exports = new Pool({
    user: 'lee',
    host: 'localhost',
    database: 'grass_roots',
    password: 'password',
    port: 5432,
  });