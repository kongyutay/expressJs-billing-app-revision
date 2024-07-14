var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/account', function(req, res, next) {
  res.render('list');
});

router.post('/account', function(req, res, next) {
  //处理表单逻辑
  console.log(req.body)
  res.render('success', { msg: '添加成功', url: '/account' });
});

router.get('/account/create', function(req, res, next) {
  res.render('create');
});

module.exports = router;
