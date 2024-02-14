//Implement a caching middleware for an Express application. The middleware should cache responses based on the request URL
// and return cached responses for subsequent identical requests. Allow cache expiration after a specified time.

const express = require('express');
const app = express();

function cachingMiddleware(req, res, next) {
  const cacheKey = req.url;
  const cacheExpiration = 60 * 1000;

  // Check if the response is cached
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < cacheExpiration) {
    console.log(`Cache hit for ${req.url}`);
    res.json(cache[cacheKey].data);
  } else {
    console.log(`Cache miss for ${req.url}`);
    const originalJson = res.json.bind(res);

    res.json = (data) => {
      cache[cacheKey] = {
        timestamp: Date.now(),
        data: data,
      };
      originalJson(data);
    };

    next();
  }
}

app.use(cachingMiddleware);

app.get('/api/data', (req, res) => {
  res.json({ timestamp: Date.now() });
});

const cache = {};

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000/');
});
