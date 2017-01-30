var express = require('express');
var router = express.Router();
 var Shortproj = require("../models/shortproj"); //shortproj.js

 var Shortener = require('shortid');






router.get('/shortproject',function(req,res,next){
		res.render('shortform');

});

router.post('/shortproject', function (req,res,next){


	var sid = Shortener.generate();
  // console.log(sid);
  // console.log(req.body.original_url);
var urlR = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
   if(req.body.original_url.match(urlR))
   {
	var data = {'original_url' : req.body.original_url, 'short_url' : sid};
  //console.log(data);

	var shortdata = new Shortproj(data);
	shortdata.save(function (err, result){
	 	if(err){
         return res.json({error: true , reason: err});
        }
        return res.json({error : false , sid : sid});
      });

  }
});



router.get('/:findurl', function(req, res, next) {
Shortproj.findOne({ short_url : req.params.findurl}).exec(function(err,url1){

  	  
    	 return res.redirect('http://'+url1.original_url);

   });
  });




module.exports = router;
