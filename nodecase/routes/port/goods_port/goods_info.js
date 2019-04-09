var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var request = require('request');
var Data = require("../../admin/config/db.js");
var url = require("url");
var querystring = require("querystring");
var goods=new Data();
/* 获取用户信息 */
router.get('/', function(req, res, next) {
    goods.selall_goods(function(err,result){
    	var goods_info =JSON.stringify(result,null,'\n');
    	// 格式化输出
        res.send(goods_info);
    });
    
});

router.post('/', function(req, res, next) {
  
  
});


module.exports = router;