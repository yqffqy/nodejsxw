var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var Data = require("../../config/db.js");
var imginfo =new Data();

/* 上传 修改 删除 */
router.post('/', function(req, res, next){
    
    	// 插入图片操作
    //生成multiparty对象，并配置上传目标路径
      var form = new multiparty.Form({uploadDir: './public/files/'});
      //上传完成后处理
      form.parse(req, function(err, fields, files) {
      	// form.parse(req, function(err, 其他文件类型, files文件类型) {
        console.log(files.inputFile[0].size); 
        var currot = fields.currot[0]; //识别修改下标
      	console.log(fields.currot[0]);
        var filesTmp = JSON.stringify(files,null,2);
        if(err){
          console.log('parse error: ' + err);
        }
        else 
        {
          console.log('parse files: ' + filesTmp);
          var inputFile = files.inputFile[0];
          var uploadedPath = inputFile.path;
          var dstPath = './public/files/' + inputFile.originalFilename;
          var portpath = '/files/' + inputFile.originalFilename;
          //重命名为真实文件名
          fs.rename(uploadedPath, dstPath, function(err) {
            if(err){
              console.log('rename error: ' + err);
            } else {
              console.log('rename ok');
            }
          });
        }

        util.inspect({fields: fields, files: filesTmp});
        // 定义操作数据
        var data =[
            inputFile.originalFilename,
            portpath,
            currot
        ];
        // 数据更新
        imginfo.imgupdata(data,function(err,result){
           // 返回新的数据
          imginfo.getimg(function(err,result){
            res.render('./admin/function/swiper/swiperimg.html',{imginfo:result,info:"修改成功"});
          });
        });
     });
  
});

module.exports = router;