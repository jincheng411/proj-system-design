const db = require('../db');

module.exports = {
  getStylesByProductId: (productId, cb) => {
    db.query(`
    SELECT s.id, s.name, s.original_price, s.sale_price,
          s.default_style, p.id AS product_id, p.slogan, p.description,
           p.category, p.default_price
    FROM styles AS s
    JOIN products AS p ON p.id = s.product_id
    WHERE p.id=${productId};
    `, (err, data) => {
      console.log(data)
      cb(err, data.rows);
    })
  }
}