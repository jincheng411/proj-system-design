const Pool = require('pg').Pool;
const db = new Pool({
  user: 'jincheng',
  host: 'localhost',
  database: 'products',
  passowrd: '',
  port: 5432
});
 module.exports = db;