var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var fs = require('fs');
var Data = require("../../config/db.js");
var goods =new Data();

/*  删除 */
router.post('/', function(req, res, next){
    // 删除图片资源
    goods.selall_goods(function(err,result){
    	  // 获取次序
    	    var currot =req.body.del_list;
          var url = "public"+result[currot].img_url;
          var gid = result[currot].gid;
          var class_id = result[currot].class_id;
          console.log(gid);
          fs.readFile(url, 'binary', function (err, data) {
            if (err) {
              if (class_id=="所有鞋柜") {
                 goods.del_goods(req.body.del_currot,function(err,result){
                  res.send("删除成功"); 
                 });
              }else{
                 // 删除子表
              goods.goods_del_child(gid,class_id,function(err,result){
                // 删除主表对应的图片信息
                goods.del_goods(req.body.del_currot,function(err,result){
                  res.send("删除成功"); 
                 });
              });
              }      	
            } else {
                fs.unlinkSync(url);

                if (class_id=="所有鞋柜") {
                  goods.del_goods(req.body.del_currot,function(err,result){
                    res.send("删除成功"); 
                  });
                }else{
                    // 删除子表
                  goods.goods_del_child(gid,class_id,function(err,result){
                       // 删除主表对应的图片信息
                     goods.del_goods(req.body.del_currot,function(err,result){
                      res.send("删除成功"); 
                     });
                  });
               }
             }
           });
       });
});

module.exports = router;