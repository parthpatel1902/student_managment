const express = require("express");
const router = new express.Router();
const studentControlller = require("./../controllers/C_student");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post("/addstudent",multipartMiddleware,studentControlller.addStudent)

module.exports =  router; 