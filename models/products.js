const db = require('../db');
module.exports = {
  getAllProducts: (cb) => {
    db.query('SELECT * FROM products LIMIT 100;', (err, data) => {
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
    GROUP BY p.id
    `;
    db.query(queryString, (err, data) => {
      cb(err,data.rows);
    })
  }
}

// SELECT p.id, p.name, p.slogan,p.description, p.category, p.default_price,
//       ARRAY_AGG(
//         SELECT *
//         FROM features AS f
//         WHERE f.id = 1
//       ) AS features
//     FROM products AS p
//     JOIN features AS f
//     ON p.id = f.product_id
//     WHERE p.id = ${id}
//     GROUP BY p.id