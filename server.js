const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('hello');
});

app.listen(port, ()=> {
  console.log('listening on port: ' + port);
})