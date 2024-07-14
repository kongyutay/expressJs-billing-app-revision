var express = require('express');
var router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter)
const shortid = require('shortid')

/* GET home page. */
router.get('/account', function(req, res, next) {
  let accounts = db.get('accounts').value()
  res.render('list', {accounts: accounts});
});

router.post('/account', function(req, res, next) {
  let id = shortid.generate()
  db.get('accounts').unshift({id:id, ...req.body}).write();
  res.render('success', {msg: '添加成功', url: '/account'});
});

router.get('/account/create', function(req, res, next) {
  res.render('create');
});

router.get('/account/list', function(req, res, next) {
  res.render('list', { title: 'Express' });
});

router.get('/account/:id', function(req, res, next) {
  let id = req.params.id;
  db.get('accounts').remove({id:id}).write()
  res.render('success', {msg: '删除成功', url: '/account'});
});

module.exports = router;
