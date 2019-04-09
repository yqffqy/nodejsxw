var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var request = require('request');
var Data = require("../../admin/config/db.js");
var url = require("url");
var querystring = require("querystring");
var user=new Data();
/* 获取用户信息 */
router.get('/', function(req, res, next) {
   var arg = url.parse(req.url).query;
  	//将arg参数字符串反序列化为一个对象
  	var params = querystring.parse(arg);
  	var opid =params.opid;
  	console.log(opid);
  	user.user_selall(opid,function(err,result){
  		console.log(result);
  		res.send(result);
  	});
    
});

router.post('/', function(req, res, next) {
  var user_data=[
      req.body.opid,
      req.body.nickName,
      req.body.avatarUrl
  ];
    user.user_sel(req.body.opid,function(err,result){
    if(result.length>0){
      console.log("用户信息已经存在");
      res.send("用户信息已经存在");
    }else{
      // 用户信息入库
      user.user_info(user_data,function(err,result){
        // 创建用户购物车
        user.user_cart(req.body.opid);
      });
      res.send("success");
    }
  });
  
  
  
});


module.exports = router;