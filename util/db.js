const Pool = require('pg').Pool;
const {db_secrets} = require('../secrets/secrets')
const db = new Pool({
  connectionString: db_secrets,
   ssl: {
  rejectUnauthorized: false
  }
 });
module.exports = db;