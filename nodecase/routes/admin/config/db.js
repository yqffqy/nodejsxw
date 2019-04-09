//连接数据库
var mysql = require('mysql');
//创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yqf19980217',
    database:'admin',
});
// 封装数据对象
function Data()
{  
     // 登录表信息查询
this.selectid = function(data,callback)
   {    
       var sql="SELECT uid FROM login WHERE username=? AND binary password=?";
       pool.getConnection(function(conn_err, conn) {
            conn.query(sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                pool.releaseConnection(conn);
                // 释放连接池
                callback(query_err,result);
            });
    });
   }
   // 用户角色验证
this.role = function(data,callback)
   {    
       var sql="SELECT role FROM login_info WHERE username=? AND binary password=?";
       pool.getConnection(function(conn_err, conn) {
            conn.query(sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                // 释放连接池
                callback(query_err,result);
            });
    });
   }
// ********************************  2019/3/15 by yangqingfeng****************
   // 上传图片路径
   this.upimg= function(data,callback)
   {    

      var  Sql = 'INSERT INTO swiper_img(img_name,url) VALUES(?,?)';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
// 意义一个更新成员函数
   this.imgupdata= function(data,callback)
   {    

      var  Sql = 'UPDATE swiper_img SET img_name =?,url=?WHERE id = ?';
       pool.getConnection(function(conn_err, conn) {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
    });
   }
// 定义图片删除对象
    this.imgdele= function(data,callback)
   {    

      var  Sql = 'DELETE FROM swiper_img where id=?';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                // conn.release();
               pool.releaseConnection(conn);
                callback(query_err,result);
            });
        }
    });
   }

   // 图片接口传递
   this.getimg= function(callback)
   {    

      var  Sql = 'select *  from swiper_img';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 商品录入
    this.in_goods= function(data,callback)
   {    

      var  Sql = 'INSERT INTO goods(gname,c_price,n_price,inventory,img_url,class_id,goods_explain,goods_labels,goods_size,goods_color) VALUES(?,?,?,?,?,?,?,?,?,?)';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 商品名字检索
   this.sel_goods= function(data,callback)
   {    

      var  Sql = 'select gname  from goods where gname=?';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 商品id检索
   this.selid_goods= function(data,callback)
   {    

      var  Sql = 'select gid  from goods where gname=?';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 所有检索商品
   this.selall_goods= function(callback)
   {    

      var  Sql = 'select *  from goods';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 商品更新
   this.goods_updata= function(data,callback)
   {    
       if(data.length==10){
         var  Sql = 'UPDATE goods SET gname=?,c_price=?,n_price=?,inventory=?,class_id=?,goods_explain=?,goods_labels=?,goods_size=?,goods_color=?WHERE gid = ?';
       }else{
        var  Sql = 'UPDATE goods SET gname=?,c_price=?,n_price=?,inventory=?,img_url=?,class_id=?,goods_explain=?,goods_labels=?,goods_size=?,goods_color=?WHERE gid = ?';
       }
       pool.getConnection(function(conn_err, conn) {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
    });
   }
   // 商品删除
    this.del_goods= function(data,callback)
   {    

       var  Sql = 'DELETE FROM goods where gid=?';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 录入所有信息子表
   this.goods_child= function(data,class_id,callback)
   {    
       switch(class_id){
         case"鞋柜精选":
           var  Sql = 'INSERT INTO choiceness(gid,gname,c_price,n_price,inventory,img_url) VALUES(?,?,?,?,?,?)';
           break;
         case"折扣商品":
           var  Sql = 'INSERT INTO discount(gid,gname,c_price,n_price,inventory,img_url) VALUES(?,?,?,?,?,?)';
           break;

        }
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 查询所有子表id
   this.goods_sel_child= function(data,class_id,callback)
   {    
       switch(class_id){
         case"鞋柜精选":
           var  Sql = 'select gid  from choiceness where gid=?';
           break;
         case"折扣商品":
           var  Sql = 'select gid  from discount where gid=?';
           break;

        }
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 更新子表信息
   this.goods_up_child= function(data,class_id,callback)
   {    
       switch(class_id){
         case"鞋柜精选":
           if(data.length==6){
            var  Sql = 'UPDATE choiceness SET gname=?,c_price=?,n_price=?,inventory=?,img_url=? where gid =?';
          }else{
            var  Sql = 'UPDATE choiceness SET gname=?,c_price=?,n_price=?,inventory=? where gid =?';
          }break;
         case"折扣商品":
           if(data.length==6){
            var  Sql = 'UPDATE discount SET gname=?,c_price=?,n_price=?,inventory=?,img_url=? where gid =?';
          }else{
            var  Sql = 'UPDATE discount SET gname=?,c_price=?,n_price=?,inventory=? where gid =?';
          }break;

        }
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 删除子表
   this.goods_del_child= function(data,class_id,callback)
   {    
       switch(class_id){
         case"鞋柜精选":
           var  Sql = 'DELETE FROM choiceness where gid=?';
           break;
         case"折扣商品":
           var  Sql = 'DELETE FROM discount where gid=?';
           break;

        }
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 查询所有子表信息
   this.sel_child_goods= function(class_id,callback)
   {   
       switch(class_id){
         case"鞋柜精选":
           var  Sql = 'select *  from choiceness ';
           break;
         case"折扣商品":
           var  Sql = 'select *  from discount ';
           break;

        }
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   /***********************************用户信息模块***********************************************/
      // 用户id信息查找
    this.user_sel= function(data,callback)
   {    
       
       console.log('执行用户查找');
       var  Sql = 'select uid from user_info where uid=?';
       pool.getConnection(function(conn_err, conn) { 
         if(conn_err) { 
            callback(err,null,null);
             
         }
          else { 
            conn.query(Sql,data, function(query_err, result) { 
            if (query_err) { 
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release(); 
                callback(query_err,result);
                console.log('用户查找成功');
            });
        }
    });
   }
    // 用户所有信息查找
    this.user_selall= function(data,callback)
   {    

       var  Sql = 'select * from user_info where uid=?';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
    // 用户所有信息查找
    this.user_all= function(callback)
   {    

       var  Sql = 'select * from user_info';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
    // wx用户信息录入
    this.user_info= function(data,callback)
   {    

      var  Sql = 'INSERT INTO user_info(uid,uname,img_url) VALUES(?,?,?)';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 创建购物车
    this.user_cart= function(data)
   {    

      var  Sql = 'INSERT INTO cart(uid) VALUES(?)';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
            });
        }
    });
   }
   // 用户检索购物车
   this.sel_cart= function(data,callback)
   {    

      var  Sql = 'select uid from cart where uid=?';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
    // 用户检索所有购物车
   this.selall_cart= function(callback)
   {    

      var  Sql = 'select * from cart ';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
                callback(query_err,result);
            });
        }
    });
   }
   // 插入用户愿望清单
    this.in_cart= function(data)
   {    

      var  Sql = 'UPDATE cart SET gid=? where uid =?';
       pool.getConnection(function(conn_err, conn) {
        if(conn_err) {
            callback(err,null,null);
        }
          else {
            conn.query(Sql,data, function(query_err, result) {
            if (query_err) {
              console.log(" Error: " + query_err.message);
              return;
              }
                conn.release();
            });
        }
    });
   }
};

module.exports = Data;