var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('demo',{title:'demo',js:'demo'});
});
module.exports = router;