const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:false,
        unique: false,
    },
    password:{
        type:String,
        minLength:[6,"Password should be at least 6 characters long."],
        required:true
    },
})

const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;
