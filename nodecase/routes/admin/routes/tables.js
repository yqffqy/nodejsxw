var express = require('express');
var router = express.Router();
// 获取商品信息页面
router.get('/', function(req, res, next) {
          res.render('./admin/routes/tables');  
});

module.exports = router;