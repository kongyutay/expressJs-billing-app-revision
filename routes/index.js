var express = require('express');
var router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '../data/db.json')
const db = low(adapter)

/* GET home page. */
router.get('/account', function(req, res, next) {
  res.render('list');
});

router.post('/account', function(req, res, next) {
  res.send('添加记录');
  console.log(req.body)
});

router.get('/account/create', function(req, res, next) {
  res.render('create');
});

router.get('/account/list', function(req, res, next) {
  res.render('list', { title: 'Express' });
});

module.exports = router;
