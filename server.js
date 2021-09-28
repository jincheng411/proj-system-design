const express = require('express');
const morgan = require('morgan');
const Products = require('./models/products')
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.send('hello');
});
app.get('/api/products', (req, res) => {
  Products.getAllProducts((err, data) => {
    res.json(data);
  })
});

app.listen(port, ()=> {
  console.log('listening on port: ' + port);
})