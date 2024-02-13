// Extend an existing Express application to include WebSocket support.
// Create a WebSocket server that echoes back any message it receives from a client.
// Implement an endpoint "/websocket" that serves an HTML page with JavaScript to establish a WebSocket connection.

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const WebSocket = require('ws');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('Received message:', message);
      ws.send(message); // Echo the message back to the client
    });
  });
}

app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/websocket.html');
});

setupWebSocket(server);

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000/');
  });
