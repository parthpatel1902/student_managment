const express = require("express");
const router = new express.Router();
const studentControlller = require("./../controllers/C_student");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post("/addstudent",multipartMiddleware,studentControlller.addStudent)
router.post("/updatestud",multipartMiddleware,studentControlller.updateStudent)
router.post("/removestud",multipartMiddleware,studentControlller.removeStud)
router.get("/displaystud",studentControlller.displayStudent);

module.exports =  router; 