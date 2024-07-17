const express = require('express');
const router = express.Router();
const moment = require('moment');
const AccountModel = require('../models/AccountModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/account', function(req, res, next) {
  AccountModel.find().sort({time: -1}).exec((err, data) => {
    if(err) {
      res.status(500).send('读取失败')
    }
    //把数据传给ejs
    res.render('list', {accounts: data, moment: moment});
    
  })
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
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if(err){
      res.status(500).send('删除失败')
      return
    }
    res.render('success', { msg: '删除成功', url: '/account' });
  })
});

module.exports = router;
