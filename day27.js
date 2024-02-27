//You are developing a web application with Node.js and Express, and you need to implement an authentication
// middleware to protect certain routes. The authentication should be token-based and support user roles
// (e.g., admin, regular user). Design a middleware function that verifies the authenticity of incoming requests
// and checks if the user has the required role to access certain routes.

const jwt = require('jsonwebtoken');

function authenticateAndAuthorize(allowedRoles) {
  return (req, res, next) => {
        const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
      const payload = jwt.verify(token, 'your-secret-key');

      if (allowedRoles && !allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
}


app.get('/admin-route', authenticateAndAuthorize(['admin']), (req, res) => {
  res.json({ message: 'Admin route accessed successfully', user: req.user });
});
