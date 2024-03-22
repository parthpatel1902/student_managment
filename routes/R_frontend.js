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

router.get( "/test", ( req, res ) =>{
	res.render( "test" );
});


module.exports=router;