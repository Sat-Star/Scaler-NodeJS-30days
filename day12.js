//Implement a rate-limiting middleware for an Express application. The middleware should limit the number of requests from a single IP address
// to a specified rate, and return a 429 Too Many Requests status if the limit is exceeded.

const express = require('express');
const app = express();

const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2, 
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

function rateLimitMiddleware(req, res, next) {
  apiLimiter(req, res, next).catch((err) => {
    if (err && err.status === 429) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  });
}

// module.exports = rateLimitMiddleware;

app.use(rateLimitMiddleware);

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000/');
});
