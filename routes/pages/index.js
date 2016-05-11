var express = require('express');
var router = express.Router();
var about = require('./about');
var demo = require('./demo');
var game = require('./game');
var blog = require('./blog');
var robot = require('./robot');
var h5 = require('./h5');
//const auth = require('../../middleware/auth').auth;

//router.use('/about', about);
router.use('/about', about);
router.use('/demo', demo);
router.use('/game', game);
router.use('/blog', blog);
router.use('/h5', h5);
router.use('/robot', robot);
router.get('/', function(req, res, next) {
  res.render('index',{title:'index',js:'index'});
});
//router.use('/disease', auth, disease);

module.exports = router;