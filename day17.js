// Define a Mongoose schema for a "User" with properties: "username" (string) and "email" (string).
// Create a Mongoose model for the User schema. Implement a function to add a new user to the MongoDB database.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    email : String
});

const User = mongoose.model('User', userSchema);

mongoose.connect('process.env.MONGDB_URI/newdb', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=>{
    console.log("connected to MongoDB database");
})
.catch((err)=>{
    console.log("error connection to db", err);
});

async function addUserToDatabase(user){
    try{
        const newUser = new User(user);
        await newUser.save();
        console.log(`User ${newUser} added successfully`);
    }
    catch(error){
        console.log("Error adding user to db", error);
    }
}

addUserToDatabase({username : "Scaler", email : 'scaler@scaler.com'});
