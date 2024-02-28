//You are developing a real-time collaborative editing tool using Node.js and Express.
// You need to integrate WebSocket functionality to allow users to see changes made by others in real-time.
// Design a solution to establish WebSocket connections, handle incoming messages, and broadcast changes
// to all connected clients efficiently

const WebSocket = require('ws');

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  const clients = new Set();

  wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('message', (message) => {
      broadcast(message, ws);
    });

    ws.on('close', () => {
      clients.delete(ws);
    });
  });

  function broadcast(message, sender) {
    for (const client of clients) {
      if (client !== sender) {
        client.send(message);
      }
    }
  }
}

const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

setupWebSocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
