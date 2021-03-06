var express = require('express');
var router = express.Router();
var about = require('./about');
var demo = require('./demo');
var game = require('./game');
var blog = require('./blog');
var robot = require('./robot');
var h5 = require('./h5');
const auth = require('../../middleware/auth');

//router.use('/about', about);
router.use('/about', about);
router.use('/demo', demo);
router.use('/game', game);
router.use('/blog', blog);
router.use('/h5', h5);
router.use('/robot', robot);
router.get('/', function(req, res, next) {
  res.render('home',{title:'我喜欢的一切',subTitle:'愿一切喜欢的都在一起',js:'clean-blog'});
});
router.get('/login', function(req, res, next) {
	var return_url=req.query.return_url;
  res.render('login',{title:'login',js:'login',return_url:return_url});
});
router.get('/logout', function(req, res, next) {
  req.session.destroy(function (err) {
      res.redirect('/');
  });
});
router.get('/mp', auth.page,function(req, res, next) {
  res.render('mp/index',{title:'mp',js:'mp'});
});

router.get('/tools/jsonEdit',function(req, res, next) {
  res.render('tools/jsonEdit',{title:'jsonEdit',js:'tools/jsonEdit'});
});
//router.use('/disease', auth, disease);

module.exports = router;
