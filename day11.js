// Implement an authentication middleware for an Express application. The middleware should check for the presence
// of a valid JWT (JSON Web Token) in the request headers. If a valid token is present, 
// allow the request to proceed; otherwise, return a 401 Unauthorized status.

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

app.get('/', authenticationMiddleware);

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
  });

module.exports = authenticationMiddleware;
