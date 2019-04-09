var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var fs = require('fs');
var Data = require("../../config/db.js");
var imginfo =new Data();

/*  删除 */
router.post('/', function(req, res, next){
    // 删除图片资源
    imginfo.getimg(function(err,result){
    	  // 获取次序
    	  var currot =req.body.del_list;
          var url = "public"+result[currot].url;
          fs.readFile(url, 'binary', function (err, data) {
            if (err) {
            	// 删除对应的图片信息
              imginfo.imgdele(req.body.del_currot,function(err,result){
                res.send("删除成功"); 
               });
            } else {
                fs.unlinkSync(url);
                // 删除对应的图片信息
                imginfo.imgdele(req.body.del_currot,function(err,result){
                res.send("删除成功"); 
               });
            }
           });
       });
});

module.exports = router;