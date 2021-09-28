const db = require('../db');
module.exports = {
  getAllProducts: (cb) => {
    db.query('SELECT * FROM products;', (err, data) => {
      cb(err, data.rows);
    })
  }
}