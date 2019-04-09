var express = require('express');
var router = express.Router();
var Data = require("./db.js");
var role = new Data();

// 拦截页面

router.get('/*', function(req, res, next) {
    console.log(req.url);
    console.log(global.role);
    if(req.url=="/zhuche"||req.url=="/login")
	{  
		next();
		return;
	}else if(global.role=="z3")
	{   
		if(req.url=="/select"||req.url=="/updata"||req.url=="/powerful"){
		   next();
		   return;
		}

	}
	else if(global.role=="z2"){
			
		     if(req.url=="/select"){
			  next();
		      return;
		     }
		     else{
		       res.send("你没有该权限");
		     }
   }else{
   	    res.redirect("/");
   }
   
});
 
module.exports = router;
