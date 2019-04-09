var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
// session全局变量设置在启动项
var bodyparser = require('body-parser');
// 设置跳转路径
var login = require('./routes/admin/Log_out/login');
var logout = require('./routes/admin/Log_out/logout');
var index = require('./routes/admin/routes/index');
var tables = require('./routes/admin/routes/tables');
var charts = require('./routes/admin/routes/charts');
var forms = require('./routes/admin/routes/forms');
// 轮播图设置
var swiper_upload = require('./routes/admin/function/swiper/swiper_upload');
var swiper_updata = require('./routes/admin/function/swiper/swiper_updata');
var swiper_del = require('./routes/admin/function/swiper/swiper_del');
var swiper_getimg = require('./routes/port/img_port/swiper_img');
// 商品管理
var goods_main = require('./routes/admin/function/goods/goods_main');
var goods_insert = require('./routes/admin/function/goods/goods_insert');
var goods_updata = require('./routes/admin/function/goods/goods_updata');
var goods_del = require('./routes/admin/function/goods/goods_del');
var goods_child = require('./routes/admin/function/goods/goods_child');
var goods_info = require('./routes/port/goods_port/goods_info');
// 录入用户信息
var user_info = require('./routes/port/user_port/user_info');
var user_all = require('./routes/admin/function/user/sel_user');
var user_cart = require('./routes/port/user_port/user_cart');
//启用cookies信息缓存
var cookieParser=require("cookie-parser");
// 下面三行设置渲染的引擎模板
app.set('views', path.join(__dirname, 'views')); //设置模板的目录
app.set('view engine', 'html'); // 设置解析模板文件类型：这里为html文件
app.engine('html', require('ejs').__express); // 使用ejs引擎解析html文件中ejs语法;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: false}));
app.use(cookieParser('spflinux'));//这里要加()
// 使用 session 中间件
app.use(session({
    secret :  'spflinux', // 对session id 相关的cookie 进行签名
     name:'adminapp',
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 , // 设置 session 的有效时间，单位毫秒
    },

}));
// 拦截器
// app.all("/*",irct);
// 获取登录页面
app.use("/",login);
// 退出
app.use('/logout',logout);
// 跳转到后台首页
app.use('/index',index);
// 跳转到商品操作页面
app.use('/tables',tables);
//跳转到商品信息
app.use('/charts',charts);
//跳转到小程序页面
app.use('/forms',forms);
// 轮播图图片接口
app.use('/swiper_getimg',swiper_getimg);
//轮播图上传更新删除
app.use('/swiper_upload',swiper_upload);
app.use('/swiper_updata',swiper_updata);
app.use('/swiper_del',swiper_del);
// 商品管理
app.use('/goods_main',goods_main);
app.use('/goods_insert',goods_insert);
app.use('/goods_updata',goods_updata);
app.use('/goods_del',goods_del);
app.use('/goods_child',goods_child);
app.use('/goods_info',goods_info);
// 获取用户资料
app.use('/user_info',user_info);
app.use('/user_all',user_all);
app.use('/user_cart',user_cart);
// app.use('/login',login);
// 查找
// app.use('/select',select);
// 更新·
// app.use('/updata',updata);


// 权限授予
// app.use('/powerful',powerful);
app.listen(80,function(){
	console.log("服务器接口：80");
});