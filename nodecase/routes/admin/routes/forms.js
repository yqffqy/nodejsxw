var express = require('express');
var router = express.Router();
// 获取小程序页面
router.get('/', function(req, res, next) {
          res.render('./admin/routes/forms');  
});

module.exports = router;