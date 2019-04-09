var express = require('express');
var router = express.Router();
var Data = require("../config/db.js");
var urole = new Data();


router.get('/', function(req, res, next) {
	      //前端页面获取数据
         urole.select(function(err,result){
         	res.render('./admin/function/powerful.html', {medata:result,udinfo:""});
         });    
});
 
router.post('/',function(req, res){

     urole.select(function(err,result){
           // 定位操作行
          if(req.body.obj!="none"&&req.body.role!="none")
         {   

            var role="nuser";
           var id = result[req.body.obj].id;
           // 若分支较多请用switch case
           if(req.body.role=="站长3"){
              role ="z3";
           }else if(req.body.role=="站长2"){
            role = "z2";
           }else if(req.body.role=="普通用户"){
            role = "nuser";
          }
          console.log(req.body.role);
          var data = [role,id];
             // 角色授权
             urole.torole(data);
             res.render('./admin/function/powerful.html', {medata:result,udinfo:"授权成功"});
         }else{
             res.render('./admin/function/powerful.html', {medata:result,udinfo:"授权失败"});
         }   
          
    });
               
});

module.exports = router;