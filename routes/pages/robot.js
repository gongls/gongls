var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.send('robot');
});
router.get('/msg', function(req, res, next) {
  res.render('msgs.pug',{title:'',dir:'robot/msgs'});
});
module.exports = router;