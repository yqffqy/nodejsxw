var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var Data = require("../../config/db.js");
var goods =new Data();

/* 商品插入 */
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
      	  fields.color[0]	  
      	];
      	console.log(data);
      	goods.sel_goods(data[0],function(err,result){
      		if (result.length>0) {
      			console.log(result);
            res.send("商品信息已经存在");
      		}
      		else{
              // 数据组织入主库
                goods.in_goods(data,function(err,result){
                  if (fields.class_id[0]=="所有鞋柜"){
                     // 数据返回
                      goods.selall_goods(function(err,result){
                           res.render('./admin/function/goods/goods_main.html',{goodsinfo:result,info:"商品录入成功"});
                      });
                  }else{
                     goods.selid_goods(data[0],function(err,result){
                    var datac =[
                        result[0].gid,
                        fields.gname[0],
                        fields.c_price[0],
                        fields.n_price[0],
                        fields.inventory[0],
                        portpath,
                      ];
                      console.log(datac);
                     // 数据分表插入
                      goods.goods_sel_child(result,fields.class_id[0],function(err,result){
                          if (result.length>0) {
                              console.log(result);
                              res.send("商品信息已经存在");
                            }else{
                              // 组织数据入类子表
                              goods.goods_child(datac,fields.class_id[0],function(err,result){
                              // 数据返回
                                  goods.selall_goods(function(err,result){
                                       res.render('./admin/function/goods/goods_main.html',{goodsinfo:result,info:"商品录入成功"});
                                  });
                              });
                            }
                        });
                  });
                  }
                  
                    
                });
      		    } 
      	});
        
     });
});

module.exports = router;