var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'dashboard' });
});
router.get('/msgs', function(req, res, next) {
  res.render('msgs', { title: '机器人回答' ,dir:'msgs'});
});

module.exports = router;
