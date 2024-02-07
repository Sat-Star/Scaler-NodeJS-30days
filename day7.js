//Implement an Express middleware function that logs the timestamp
// and the HTTP method of every incoming request to the server.

const port = 3000;
const express = require('express');
const app = express();

function requestLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toDateString();
    const {method} = req;
    console.log(`${timestamp} - ${method} request received`);
    next();
}

app.use(requestLoggerMiddleware);

app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`);
})