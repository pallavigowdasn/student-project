
const express = require("express");  // calling express framework
const app = express();              // creating object of express
const cors = require("cors");      // calling cors origin library
app.use(cors());                  // creating object of cors library
app.use(express.json()); // injecting .json to send and receive data in json format

// db connection 
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shopping", {UseNewUrlParser:true})
const db = mongoose.connection;

db.on("error", (error)=>console("Error in database connection"));
db.on("open", ()=>console.log("Database is Connected..."));

const Item = require("./studentapi");
app.use("/itemlist", Item);  // http://localhost:1111/itemlist - (get, post, put, delete)
/*
// const User = require("./userapi");
// app.use("/userlist", User);    // http://localhost:1111/userlist - (get, post, put, delete)
*/ 

app.listen(1111, ()=>console.log("The Server is Live Now..."));