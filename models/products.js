const db = require('../db');
module.exports = {
  getAllProducts: (page, count, cb) => {
    const queryString = `
    SELECT *
    FROM products
    LIMIT ${count}
    OFFSET ${count * (page - 1)};`;
    db.query(queryString, (err, data) => {
      cb(err, data.rows);
    })
  },
  getProduct: (id, cb) => {
    const queryString = `
    SELECT p.id, p.name, p.slogan,p.description, p.category, p.default_price,
      JSON_AGG(json_build_object('feature', f.feature, 'value', f.value)) AS features
    FROM products AS p
    JOIN features AS f
    ON p.id = f.product_id
    WHERE p.id = ${id}
    GROUP BY p.id;
    `;
    db.query(queryString, (err, data) => {
      cb(err,data.rows);
    })
  },
  getRelatedProducts: (productId, cb) => {
    const queryString = `
    SELECT related_product_id
    FROM related
    JOIN products
    ON related.current_product_id = products.id
    WHERE products.id = ${productId}
    `;
    db.query(queryString, (err, data) => {
    if (err) console.log(err)
      cb(err, data.rows)
    })
  }
}

