//You are developing a complex web application with multiple routes and middleware in Node.js and Express.
// You want to implement a centralized error handling mechanism to catch and handle errors gracefully without
// crashing the server. Design a middleware function that intercepts errors thrown by route handlers or
// other middleware and sends an appropriate error response to the client.

function errorHandler(err, req, res, next) {
    // Check if the error is a known HTTP error (status code provided)
    if (err.statusCode) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      // Handle unexpected errors
      console.error(err.stack);

      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  const express = require('express');
  const app = express();
  
  // routes and middleware can be defined here
  
  app.use(errorHandler);
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  