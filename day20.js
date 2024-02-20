//Create an Express route that uses MongoDB aggregation to calculate and return the average age of all users in the database.

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(`${process.env.MONGODB_URI}/dbname`, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

app.get('/average-age', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.json({ averageAge: result[0].averageAge });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    mongoose.connection.close();
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
