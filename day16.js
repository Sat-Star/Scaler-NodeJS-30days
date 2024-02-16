//  Create an Express application with MongoDB integration using Mongoose. Implement a function to establish a connection
// to a MongoDB database. Ensure that the connection is successful and log a success message.
const mongoose = require("mongoose");
require('dotenv').config()
const express = require('express')
const app = express()

function connectToMongoDB() {
    ;(async () => {
        try{
            mongoose.connect(`${process.env.MONGODB_URI}/day16`)
            app.on("error", (error)=>{
                console.log("err", error);
                throw error;
            })

            app.listen(3000, () => {
                console.log(`Connected to DB`);
            })
        }
        catch(error){
            console.log("error", error);
            throw err
        }
    })()
}

connectToMongoDB();