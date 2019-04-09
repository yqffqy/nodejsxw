var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var request = require('request');
var Data = require("../../admin/config/db.js");
var url = require("url");
var querystring = require("querystring");
var user=new Data();
/* 获取用户信息 */
router.get('/', function(req, res, next) {
   
   user.selall_cart(function(err,result){
      res.send(result);
   }) 
});

router.post('/', function(req, res, next) {
  var data=[
      req.body.gid,
      req.body.opid
  ];
  console.log(data);
  // 检索用户购物车
  user.sel_cart(req.body.opid,function(err,result){
    console.log(result);
    if(result.length>0){
      // 插入用户愿望清单
      user.in_cart(data);
      res.send("ok");
    }
  });
  
});


module.exports = router;