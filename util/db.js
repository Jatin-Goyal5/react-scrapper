const Pool = require('pg').Pool;

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blogs',
    password: '123456789',
    port: 5432,
  })
module.exports = db;