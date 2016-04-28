var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api');
});

router.post('/blog', function(req, res, next) {
	var title=req.body.title;
	var text=req.body.text;
  res.send('api');
});

router.get('/blogs', function(req, res, next) {
  res.send('getblogs');
});

router.get('/blog/:id', function(req, res, next) {
	var id=req.params.id;
  res.send('get blog id:'+id);
});

router.put('/blog/:id', function(req, res, next) {
	var id=req.params.id;
	var title=req.body.title;
	var text=req.body.text;
  res.send('update blog id:'+id);
});

router.delete('/blog/:id', function(req, res, next) {
  if (req.session.user){

  }
  var id=req.params.id;
  res.send('delete blog id:'+id);
});


router.get('/logout', function(req, res, next) {
  req.session.destroy(function (err) {
      res.redirect('/');
  });
});



module.exports = router;
