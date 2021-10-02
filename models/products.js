const db = require('../db');
module.exports = {
  getAllProducts: (page, count, cb) => {
    const queryString = `
    SELECT *
    FROM products
    LIMIT ${count}
    OFFSET ${count * (page - 1)};`;
    return db.query(queryString).then(({rows}) => {
      return rows;
    }).catch(err => {
      console.log(err);
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
    return db.query(queryString).then(({rows}) => {
      return rows;
    }).catch(err => {
      console.log(err)
    })
  },
  getRelatedProducts: (productId) => {
    const queryString = `
    SELECT related_product_id
    FROM related
    JOIN products
    ON related.current_product_id = products.id
    WHERE products.id = ${productId}
    `;
    return db.query(queryString).then(({rows}) => {
      return rows;
    }).catch(err => {
      console.log(err)
    })
  }
}

