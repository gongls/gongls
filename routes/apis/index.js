var express = require('express');
var router = express.Router();
var blog = require('./blog');
var img = require('./img');
//const auth = require('../../middleware/auth').auth;

router.use('/blog', blog);
router.use('/img', img);
//router.use('/disease', auth, disease);
router.get('/', function(req, res, next) {
  res.send(req.body);
});
router.post('/', function(req, res, next) {
	var json_result=req.body;
	res.send(json_result.name);
  //
  /*
  xml2js.parseString(req.body,{ explicitArray : false, ignoreAttrs : true }, function(err, result){

      res.json(req.body);
  });
  //*/
});
module.exports = router;