const { Pool } = require("pg");

const connection = new Pool({database: process.env.PGDATABASE});

module.exports = connection