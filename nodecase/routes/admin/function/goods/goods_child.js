var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var fs = require('fs');
var Data = require("../../config/db.js");
var goods =new Data();
var url = require("url");
var querystring = require("querystring");
// 获取商品管理主页面
router.get("/",function(req,res,next){
    
    var arg = url.parse(req.url).query;
	//将arg参数字符串反序列化为一个对象
	var params = querystring.parse(arg);
	var class_id =params.class_id;
	console.log(class_id);
    goods.sel_child_goods(class_id,function(err,result){
    	console.log(result);
        res.render('./admin/function/goods/goods_child.html',{goodsinfo:result});
    });  
});

/* 商品管理 */
router.post('/', function(req, res, next){
    
    res.send();
});

module.exports = router;