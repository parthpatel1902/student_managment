require('dotenv').config();
const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("MongoDB is connected..");
}).catch((err)=>{
    console.log(`Some Error In connection : ${err}`);
});

module.exports = conn;