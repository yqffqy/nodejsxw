var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var Data = require("../../config/db.js");
var goods =new Data();

/* 商品更新 */
router.post('/', function(req, res, next){

   // 插入图片操作
    //生成multiparty对象，并配置上传目标路径
      var form = new multiparty.Form({uploadDir: './public/goods/'});
      
      //上传完成后处理
      form.parse(req, function(err, fields, files) {
        // form.parse(req, function(err, 其他文件类型, files文件类型) {
        var filesTmp = JSON.stringify(files,null,2);
        if(err){
          console.log('parse error: ' + err);
        }
        else 
        {
          // console.log('parse files: ' + filesTmp);
          var inputFile = files.inputFile[0];
          var uploadedPath = inputFile.path;
          var dstPath = './public/goods/' + inputFile.originalFilename;
          var portpath = '/goods/' + inputFile.originalFilename;
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
        if(portpath=="/goods/"){
          var data =[
          fields.gname[0],
          fields.c_price[0],
          fields.n_price[0],
          fields.inventory[0],
          fields.class_id[0],
          fields.explain[0],
          fields.labels[0],
          fields.size[0],
          fields.color[0],
          fields.gid[0]   
        ];
      }else{
          var data =[
          fields.gname[0],
          fields.c_price[0],
          fields.n_price[0],
          fields.inventory[0],
          portpath,
          fields.class_id[0],
          fields.explain[0],
          fields.labels[0],
          fields.size[0],
          fields.color[0],
          fields.gid[0]   
        ];
      }  
        
        console.log(data);
        goods.goods_updata(data,function(err,result){
          if (fields.class_id[0]=="所有鞋柜") {
             // 返回数据
               goods.selall_goods(function(err,result){
                    res.render('./admin/function/goods/goods_main.html',{goodsinfo:result,info:"商品更新成功"});
                });
          }else{
                goods.selid_goods(data[0],function(err,result){
                  // 数据筛选
                  if(portpath=="/goods/"){
                    var datac =[
                        fields.gname[0],
                        fields.c_price[0],
                        fields.n_price[0],
                        fields.inventory[0],
                        result[0].gid
                      ];
                  }else{
                    var datac =[
                        fields.gname[0],
                        fields.c_price[0],
                        fields.n_price[0],
                        fields.inventory[0],
                        portpath,
                        result[0].gid
                      ];
                  }
                   goods.goods_up_child(datac,fields.class_id[0],function(err,result){
                     // 返回数据
                     goods.selall_goods(function(err,result){
                          res.render('./admin/function/goods/goods_main.html',{goodsinfo:result,info:"商品更新成功"});
                      });
                   })
                });
            }
           
        });
        
     });
});

module.exports = router;