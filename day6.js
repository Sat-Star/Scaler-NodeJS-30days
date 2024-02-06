//You are building a web application using Express in Node.js. 
//Create an Express route to handle GET requests to the endpoint "/greet" that takes a query parameter "name" 
//and returns a personalized greeting. If the name parameter is not provided, the default greeting should be "Hello, Guest!".

const express = require('express');
const app = express();
const port = 3000;

function greetHandler(req, res){
    const name = req.query.name || "Guest";
    res.send(`Hello ${name}!`);
}

app.get('/greet', greetHandler);

app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`);
});