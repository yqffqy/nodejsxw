var express = require('express');
var router = express.Router();
// 获取登录页面
router.get('/', function(req, res, next) {
           req.session.userName = null; // 删除session 
           console.log(req.session.userName);
           res.redirect('/');   
});

 
module.exports = router;