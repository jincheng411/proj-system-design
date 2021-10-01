const express = require('express');
const morgan = require('morgan');
const Products = require('./models/products')
const Styles = require('./models/styles')
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.send('hello');
});
app.get('/api/products', (req, res) => {
  const {page, count} = req.query;
  Products.getAllProducts(page || 1, count || 5, (err, data) => {
    res.json(data);
  })
});
app.get('/api/products/:id', (req, res) => {
  var {id} = req.params;
  Products.getProduct(id, (err, data) => {
    res.json(data);
  })
});

app.get('/api/products/:product_id/styles', (req, res) => {
  var {product_id} = req.params;
  Styles.getStylesByProductId(product_id, (err, data) => {
    res.json(data);
  })
})

app.get('/api/products/:product_id/related', (req, res) => {
  var {product_id} = req.params;
  Products.getRelatedProducts(product_id, (err, data) => {
    let arr = [];
    for (let i of data) {
      arr.push(Number(i.related_product_id))
    }
    res.json(arr);
  })
})

app.listen(port, ()=> {
  console.log('listening on port: ' + port);
})