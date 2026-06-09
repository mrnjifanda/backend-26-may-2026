const express = require('express');
const mongoose = require('mongoose');
const PORT = 4010;


// title, content, price and quantity

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('user', userSchema);

const run = () => {
  const app = express();
  app.use(express.json());

  // List all user
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      return res.json({
        error: false,
        message: "All users",
        data: users
      });
    } catch (e) {
      return res.status(500).json({
        error: true,
        message: "Internal server error, please try later."
      });
    }
  });

  // Get one user by ID
  app.get("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User with id: " + id + " not found"
        });
      }

      return res.json({
        error: false,
        message: "User found",
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error, please try later"
      });
    }
  });

  // Create user
  app.post("/users/create", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          error: true,
          message: "Error, please fill all data in form"
        });
      }

      await User.create({
        username,
        email,
        password
      });

      return res.status(201).json({
        error: false,
        message: "User created successfuly"
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error, please try later"
      });
    }
  });

  // Update one user with ID
  app.put('/users/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      // 1 st
      // const user = await User.findById(id);
      // if (!user) {
      //   return res.status(404).json({
      //     error: true,
      //     message: "User not found, please verify id"
      //   });
      // }

      // user.username = data.username;
      // user.email = data.email;
      // user.password = data.password;

      // await user.save();

      // 2nd
      const update = await User.findByIdAndUpdate(id, data);
      if (!update) {
        return res.status(404).json({
          error: true,
          message: "User not found, please verify id"
        });
      }

      return res.json({
        error: false,
        message: "User updated Okay"
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error, please try later"
      });
    }
  });

  // Delete user by ID
  app.delete('/users/delete/:id', async (req, res) => {
    try {
      const { id } = res.params;
      await User.findOneAndDelete(id);

      return res.json({
        error: false,
        message: "User deleted successfully !!!"
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error, please try later"
      });
    }
  });

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