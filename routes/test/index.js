var express = require('express');
var router = express.Router();
var robot = require('./robot');
//const auth = require('../../middleware/auth').auth;

router.use('/robot', robot);
//router.use('/disease', auth, disease);
router.get('/', function(req, res, next) {
  res.send('test');
});
module.exports = router;