const express = require('express');
require('dotenv').config();
const app = express();
require('./db/conn');
const port = process.env.PORT;
const cors = require("cors");
const studentRouter = require('./routes/R_student');


// cors setup from accept the html-form data.
app.use(cors({origin: "*",credentials: true,}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//Router
app.use(studentRouter);

app.use(express.json());

app.listen(port,()=>{
    console.log(`Server is Running on http://localhost:${port}`);
})

