const express = require('express');
const morgan = require('morgan');
const Products = require('./models/products')
const Styles = require('./models/styles')
const app = express();

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
  var { id } = req.params;
  Products.getProduct(id).then((data) => {
    res.json(data)
  }).catch(err => {
    res.status(400);
    res.send('404');
  });
});

app.get('/api/products/:product_id/styles', (req, res) => {
  var { product_id } = req.params;
  Styles.getStylesByProductId(product_id)
    .then(data => {
      res.json(data)
    }).catch(err => {
      res.status(400);
      res.send('400')
    })
  // res.json(data)
})

app.get('/api/products/:product_id/related', (req, res) => {
  var { product_id } = req.params;
  Products.getRelatedProducts(product_id)
    .then(data => {
      let arr = [];
      console.log(data)
      for (let i of data) {
        arr.push(Number(i.related_product_id))
      }
      res.json(arr);
    }).catch(err => {
      res.status(400);
      res.send('400')
    })
})

module.exports = app;