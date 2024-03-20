const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const app = express();
require('./db/conn');
const path = require("path");
const port = process.env.PORT;
const cors = require("cors");
const studentRouter = require('./routes/R_student');
const frontedRouter = require('./routes/R_frontend');

// Router
app.use(studentRouter);
app.use(frontedRouter);

// cors
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Set view engine and views path
const viewPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
});
