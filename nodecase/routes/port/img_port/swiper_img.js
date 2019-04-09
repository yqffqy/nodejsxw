
var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var Data = require("../../admin/config/db.js");
var imginfo =new Data();
/* 上传页面 */
router.get('/', function(req, res, next) {
  imginfo.getimg(function(err,result){
     //重命名为真实文件名
     var url=[];
      for(var i=0;i<result.length;i++){
         url[i] = result[i].url;
      }
      console.log(url);
      res.send(url);
  });
 
});

/* 上传*/


module.exports = router;