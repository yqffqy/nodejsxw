var express = require('express');
var router = express.Router();
// 获取后台页面
router.get('/', function(req, res, next) {
          res.render('./index');  
});

module.exports = router;