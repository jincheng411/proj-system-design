const Pool = require('pg').Pool;
const db = new Pool({
  user: 'jincheng',
  host: 'localhost',
  database: 'products',
  password: '',
  port: 5432
});
db.connect((err)=> {
  if (err) {
    console.log(err);
  } else {
    console.log('postgres connected');
  }
})
 module.exports = db;