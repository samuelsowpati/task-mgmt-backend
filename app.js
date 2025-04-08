require('dotenv').config();

//importing required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//importing routes

const gptRoutes = require('./routes/gptRoutes');
const authRoutes = require('./routes/authRoutes');
const userTaskRoutes = require('./routes/userTaskRoutes');
//importing environment variables
// const uname = process.env.USERNAME1;
// const pass = process.env.PASSWORD1;

const app = express();

//connecting to database
try {
    mongoose.connect(process.env.MONGO_URI);
} catch(err) {
    console.log("Unable to connect to DB", uname, pass);
}

//setting up middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//setting up routes

app.use('/', gptRoutes);
app.use('/', authRoutes);

app.use('/', userTaskRoutes);

app.listen(3000);