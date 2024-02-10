//Create an Express application that serves static files (e.g., HTML, CSS, images) from a "public" directory. 
//Ensure that accessing the root ("/") returns the "index.html" file from the "public" directory.

const express = require('express');
const app = express();
const path = require('path');

function staticFileServer(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', staticFileServer);

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

