// Create an Express route that retrieves all users from the MongoDB database and returns them as a JSON response.

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

mongoose.connect('process.env.MONGODB_URI/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
const port = 3000;

function getAllUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving users from the database' });
    } else {
      res.json(users);
    }
  });
}

app.get('/users', getAllUsers);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
