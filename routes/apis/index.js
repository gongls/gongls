var express = require('express');
var router = express.Router();
var blog = require('./blog');
var img = require('./img');
//const auth = require('../../middleware/auth').auth;

router.use('/blog', blog);
router.use('/img', img);
//router.use('/disease', auth, disease);
router.get('/', function(req, res, next) {
  res.send('api');
});
module.exports = router;