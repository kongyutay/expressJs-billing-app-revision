var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/account/create', function(req, res, next) {
  res.render('create');
});

router.get('/account/list', function(req, res, next) {
  res.render('list', { title: 'Express' });
});

module.exports = router;
