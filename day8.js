// Create an Express route that throws an error if the request parameter "number" is not a positive integer.
// Implement an error handling middleware to catch and handle this specific error,
// returning a custom error message and a 400 Bad Request status.

const express = require('express');
const app = express();
const port = 3000;

function positiveIntegerHandler(req, res) {
    const num = parseInt(req.query.number);
    if(num > 0){
        res.send(`Successfully received ${num}`)
    }
    else{
        throw new Error(`Number must be positive`);
    }
}

app.use((err, req, res, next) => {
    if (err.message == 'Number must be positive'){
        res.status(400).send(`Provide a positive integer`);
    }
    else{
        next(err);
    }
});

app.get('/positive', positiveIntegerHandler);

app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`);
});