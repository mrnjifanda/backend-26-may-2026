const express = require('express');
const mongoose = require('mongoose');
const PORT = 4010;

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('user', userSchema);

const run = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.status(201).send('Hello, World!');
  });

  app.get('/about-us', (req, res) => {
    res.send('About Us');
  });

  app.get('/courses/php', (req, res) => {

    // 
    // const name = req.query.name;
    // const age = req.query.age;
    const { name, age } = req.query;
    res.send('PHP & Course: ' + name + ', Age: ' + age);
  });

  app.get('/courses/:courseTitle', (req, res) => {

    // Parameters (req.params)
    // let title = req.params.courseTitle;
    // if (!title) {
    //   title = "Hello";
    // }
    const { courseTitle } = req.params;

    res.send("My course, title is " + courseTitle);
  });

  app.get('/courses/:courseCategory/:courseTitle', (req, res) => {
    const { courseCategory, courseTitle } = req.params;

    res.send("My course, category is " + courseCategory + " and title is " + courseTitle);
  });

  app.get('/login', (req, res) => {
    res.send(`<form method="post" action="/login">
    <input type="text" name="username" placeholder="Username" required/>
    <input type="password" name="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>`);
  });

  app.post('/login', (req, res) => {
    const data = req.body; // { username: '...', password: '...' }
    console.log(data);
    res.send('Login');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
};

mongoose
  .connect('mongodb://root:password@127.0.0.1:27017/level_4_may?authSource=admin')
  .then(() => {
    console.log('Connected to MongoDB')
    run();
  })
  .catch(err => console.error(
    'Could not connect to MongoDB',
    err
  ));