var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.send('h5');
});
module.exports = router;