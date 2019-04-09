var express = require('express');
var router = express.Router();
var Data = require("../config/db.js");
var session = require('express-session');
var findid = new Data();
global.role="null";
// 获取登录页面

router.get('/', function(req, res, next) {
    
       res.render('./login.html',{msg:""});  
});
// 用户登录信息获取
router.post('/', function(req, res, next) {
      var data = [
       req.body.uname,
       req.body.upwd
      ];
           findid.selectid(data,function(err,result){
            if(result.length>0){
                // 角色验证
              findid.role(data,function(err,result){
                 global.role =result[0].role;
                  // session登录验证
                req.session.userName = req.body.uname;
                if(req.session.userName){
                  if(global.role=="nuser"){
                    // 普通用户重定向到登录页面
                    res.render('login.html',{username : req.session.userName,msg:""});
                  }else{
                    // 管理员用户登录到后台
                    res.render('./index.html',{username : req.session.userName,msg:"登录成功"});
                  }  
                }  
               else{ 
                  res.redirect('/');//指向login路径
              }
              });
           
            }else{
                res.render("./login.html",{msg:"用户名或密码有误"});
            }
            
           });
           
      
      
});
 
module.exports = router;