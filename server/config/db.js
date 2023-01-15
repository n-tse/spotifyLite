const path = require("path");
require("dotenv").config(path.join(__dirname, "../.env"));
const mongoose = require("mongoose"); // mongoose is an ODM (object data mondeling) library that allows us to interact with MongoDB. Mongoose provides a lot of methods we can call to access and change contents of mongodb database. 
mongoose.set("strictQuery", false);
const { MONGO_URL } = process.env; // process is like a global variable. takes the properties in .env that matches the name in the array destructure

mongoose.connect(MONGO_URL, (error) => { // call connect method in mongoose library and connects to mongodb library. our app is connected to the database we linked in the .env
  if (error) console.log(error);
  else console.log("Connected to DB.");
}
);

module.exports = mongoose.connection; 