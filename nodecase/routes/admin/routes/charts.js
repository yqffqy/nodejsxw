var express = require('express');
var router = express.Router();
// 获取信息统计页面
router.get('/', function(req, res, next) {
          res.render('./admin/routes/charts');  
});

module.exports = router;