const express = require('express');
const router = express.Router();
const moment = require('moment');
const AccountModel = require('../models/AccountModel');

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
  AccountModel.create({...req.body, time: moment(req.body.time).toDate()}, (err, data)=> {
    if(err) {
      res.status(500).send('插入失败')
      return
    }
    res.render('success', { msg: '添加成功', url: '/account' });
  })
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
