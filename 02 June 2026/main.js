const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(201).send('Hello, World!');
});

app.get('/about-us', (req, res) => {
  res.send('About Us');
});

app.listen(4010, () => {
  console.log('Server is running on port http://localhost:4010');
});