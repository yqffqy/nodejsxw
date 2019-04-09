var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var fs = require('fs');
var Data = require("../../config/db.js");
var goods =new Data();
// 获取商品管理主页面
router.get("/",function(req,res,next){
    goods.selall_goods(function(err,result){
        res.render('./admin/function/goods/goods_main.html',{goodsinfo:result});
    })
    
});

/* 商品管理 */
router.post('/', function(req, res, next){
    
});

module.exports = router;