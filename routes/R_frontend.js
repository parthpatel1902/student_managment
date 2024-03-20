const express = require("express");
const router = new express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get( "/", ( req, res ) =>{
	res.render( "index" );
});
router.get( "/view", ( req, res ) =>{
	res.render( "data" );
});

module.exports=router;