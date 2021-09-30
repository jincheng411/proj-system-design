const db = require('../db');

module.exports = {
  getStylesByProductId: (productId, cb) => {
    db.query(`
    SELECT  p.id AS product_id, ARRAY_AGG(JSON_BUILD_OBJECT('style_id', s.id, 'name', s.name, 'original_price', s.original_price, 'sale_price', s.sale_price,
           'default?', s.default_style)) AS results
    FROM styles AS s
    JOIN products AS p
    ON p.id = s.product_id
    WHERE p.id=${productId}
    GROUP BY p.id;
    `, (err, data) => {
      console.log(err)
      cb(err, data.rows);
    })
  }
}