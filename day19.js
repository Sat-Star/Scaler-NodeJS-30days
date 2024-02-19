// Enhance the user schema from the previous question to include validation for the "email" property (must be a valid email address).
// Implement a function to add a new user to the MongoDB database with validation.

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI/dbname, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  },
});

const User = mongoose.model('User', userSchema);

function addUserWithValidation(user) {
  const newUser = new User(user);

  newUser.save((err) => {
    if (err) {
      if (err.name === 'ValidationError') {
        console.error('Validation Error:', err.message);
      } else {
        console.error('Error:', err);
      }
    } else {
      console.log('User added successfully');
    }
    mongoose.connection.close();
  });
}

addUserWithValidation({ username: 'john_doe', email: 'john.doe@example.com' });
addUserWithValidation({ username: 'Scaler_official', email: 'scaler.com' });
