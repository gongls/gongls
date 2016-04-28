var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('blogs', { title: '' });
});

router.get('/add', function(req, res, next) {
  res.render('blog_add', { title: '',dir:'blog/add' });
  console.log(req);
});

router.get('/edit/:id', function(req, res, next) {
	var id=req.params.id;
  res.render('blog_edit', { title: '' ,id:id});
});

module.exports = router;
