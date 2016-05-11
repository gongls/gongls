var express = require('express');
var router = express.Router();

/* GET users listing. */

router.post('/', function(req, res, next) {
  var title=req.body.title;
  var text=req.body.text;
  res.send('api');
});

router.get('/', function(req, res, next) {
  res.send('getblogs');
});

router.get('/:id', function(req, res, next) {
	var id=req.params.id;
  res.send('get blog id:'+id);
});

router.put('/:id', function(req, res, next) {
	var id=req.params.id;
	var title=req.body.title;
	var text=req.body.text;
  res.send('update blog id:'+id);
});

router.delete('/:id', function(req, res, next) {
  if (req.session.user){

  }
  var id=req.params.id;
  res.send('delete blog id:'+id);
});




module.exports = router;
