var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var Data = require("../../config/db.js");
var user =new Data();
// 获取商品管理主页面
router.get("/",function(req,res,next){
  user.user_all(function(err,result){
    res.render('./admin/function/user/user_info.html',{userinfo:result});
  })
        
      
});

/* 商品管理 */
router.post('/', function(req, res, next){
    
    res.send();
});

module.exports = router;