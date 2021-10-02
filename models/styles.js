const db = require('../db');

module.exports = {
  getStylesByProductId: (productId, cb) => {
    db.query(`
    SELECT  p.id AS product_id,
            ARRAY_AGG(JSON_BUILD_OBJECT
              (
                'style_id', s.id,
                'name', s.name,
                'original_price', s.original_price,
                'sale_price', s.sale_price,
                'default?', s.default_style,
                'photos', (SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
                            'thumbnail_url', photos.thumbnail_url,
                            'url', photos.url
                          ))
                          FROM photos
                          JOIN styles
                          ON styles.id = photos.styleId
                          WHERE styles.id = p.id
                          GROUP BY styles.id),
                'skus', (SELECT JSON_OBJECT_AGG(
                                sk.id, (SELECT JSON_BUILD_OBJECT(
                                                      'size', skus.size,
                                                      'quantity', skus.quantity
                                                    )
                                          FROM skus
                                          WHERE skus.id = sk.id
                                        )
                                )
                          FROM skus AS sk
                          JOIN styles
                          ON styles.id = sk.styleId
                          WHERE styles.id = s.id
                          GROUP BY styles.id
                        )
              )
            ) AS results
    FROM styles AS s
    JOIN products AS p
    ON p.id = s.product_id
    WHERE p.id=${productId}
    GROUP BY p.id;
    `, (err, data) => {
      if (err) console.log(err)
      return data.rows
      cb(err, data.rows);
    })
  }
}