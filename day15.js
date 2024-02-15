//Create a logging middleware for an Express application. The middleware should log detailed information about
// each incoming request, including the timestamp, HTTP method, URL, request headers, and request body.

const express = require('express');
const bodyParser = require('body-parser');

function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();

  console.log(`Timestamp: ${timestamp}`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.originalUrl}`);
  console.log('Headers:', req.headers);

  if (req.body) {
    console.log('Request Body:', req.body);
  }
  next();
}

const app = express();

app.use(bodyParser.json());
app.use(loggingMiddleware);

app.get('/', (req, res) => {
  res.send('Hello, this is the home route!');
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  res.json({ message: 'Data received successfully' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}/`);
});
