var express = require('express');
var router = express.Router();
 var Shortproj = require("../models/shortproj"); //shortproj.js

 var Shortener = require('shortid');






router.get('/shortproject',function(req,res,next){
		res.render('shortform');

});

router.post('/shortproject', function (req,res,next){
	

	var sid = Shortener.generate(req.body.original_url);
	
	var data = {'original_url' : req.body.original_url, 'short_url' : sid};
	var shorten = new Shortproj(data);
	shorten.save(function (err, result){
		if(err){  
          return res.json({error: true , reason: err});
        }
        return res.json({error : false , result : shorten.short_url});


	});


});



router.get('/:url', function(req, res, next) {
 Shortproj.findOne({ short_url : req.params.url})
  .exec(function(err,url){
  	return res.render('list',{url:url})
  });
});

//var shorturl = Shortener.generate();
//console.log(shorturl);
/*var data = req.body;
var data1 = {'original_url': data , 'short_url': shorturl};
console.log(data1);*/


module.exports = router;
