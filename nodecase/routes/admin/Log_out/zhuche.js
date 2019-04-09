var express = require('express');
var router = express.Router();
var Data = require("../config/db.js");

var addsel = new Data();
router.get('/', function(req, res, next) {
	
          res.render('./admin/function/zhuche.html', {result:""});
     
});
 
router.post('/',function(req, res){
	// 获取前端数据
	var add = new Data();
	var data = [
	    req.body.username,
	    req.body.password
	   ];
		
	var data_id = [
	    req.body.username
	];

	console.log(JSON.stringify(data_id));
	    
	       // 查询数据是否存在
	    addsel.unameid(data_id,function(err,result){
           var resultdata =false;
	    	if(result.length>0){           
                 resultdata =true;
            }
              console.log(resultdata);
              if(resultdata){
              	  var message = "用户信息已经存在";
                  res.render('./admin/function/zhuche.html', {result:message});
              }
              else{
              	// 若果数据不存在，那么就进行·插入操作·
              	   add.addinfo(data,function(err, result){
	               addsel.unameid(data_id,function(err,result){
                   var resultdata = false;
	    	  if(result.length>0){           
                 resultdata =true;
            }
             if (resultdata) {
             	 var message = "信息已经插入";
             	 res.render('./admin/function/zhuche.html', {result:message}); 
                 }
	          });  
	          // 用户信息转移
             add.infoturn(data);
            });
        }			
 });
	

	
});

module.exports = router;