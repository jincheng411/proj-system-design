const express = require('express');
const morgan = require('morgan');
const Products = require('./models/products')
const Styles = require('./models/styles')
const app = express();
const redis = require('redis');
const client = redis.createClient();
client.on('connect', (err)=> {
  if (err) {
    console.log('err on redis' + err);
  } else {
    console.log('redis connected');
  }
})

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.send('hello');
});
app.get('/api/products', (req, res) => {
  const { page, count } = req.query;
  Products.getAllProducts(page || 1, count || 5).then((data) => {
    res.json(data);
  }).catch(err => {
    res.status(400);
    res.send('404');
  })
});
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const redisKey = `product-${id}`
  client.get(redisKey, (err, data) => {
    if (data) {
      console.log('redis hit')
      res.send(data);
    } else {
      Products.getProduct(id).then((data) => {
        client.setex(redisKey, 5, JSON.stringify(data))
        res.json(data)
      }).catch(err => {
        res.status(400);
        res.send('404');
      });
    }
  })
});

app.get('/api/products/:product_id/styles', (req, res) => {
  const { product_id } = req.params;
  const redisKey = `style-${product_id}`

    client.get(redisKey, (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      }
     if (data) {
       console.log('redis hit')
       res.send(data);
     } else {
       Styles.getStylesByProductId(product_id)
         .then(data => {
          client.setex(redisKey, 5, JSON.stringify(data[0])) //redis cache expires 600s
           res.json(data[0]);
         }).catch(err => {
           res.status(400);
           res.send('400');
         })
     }
    })
})

app.get('/api/products/:product_id/related', (req, res) => {
  var { product_id } = req.params;
  const redisKey = `related-${product_id}`;
  client.get(redisKey, (err, data) => {
    if (data) {
      console.log('redis hit');
      res.json(JSON.parse(data));
    } else {
      Products.getRelatedProducts(product_id)
        .then(data => {
          let arr = [];
          for (let i of data) {
            arr.push(Number(i.related_product_id))
          }
          client.setex(redisKey, 5, JSON.stringify(arr));
          res.json(arr);
        }).catch(err => {
          res.status(400);
          res.send('400');
        })
    }
  })
})

module.exports = app;