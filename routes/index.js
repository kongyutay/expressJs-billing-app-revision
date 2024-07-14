const express = require('express');
const router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter)
const shortid = require('shortid')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/account', function(req, res, next) {
  let accounts = db.get('accounts').value()
  res.render('list', {accounts});
});

router.post('/account', function(req, res, next) {
  //处理表单逻辑
  let id = shortid.generate()
  db.get('accounts').unshift({id, ...req.body}).write();
  console.log(req.body)
  res.render('success', { msg: '添加成功', url: '/account' });
});

router.get('/account/create', function(req, res, next) {
  res.render('create');
});

router.get('/account/:id', function(req, res, next) {
  //删除逻辑
  let id = req.params.id
  db.get('accounts').remove({ id }).write()
  res.render('success', { msg: '删除成功', url: '/account' });
});

module.exports = router;
