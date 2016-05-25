var express = require('express');
var router = express.Router();
var db=require('../../lib/db');
/* GET users listing. */


router.get('/logout', function(req, res, next) {
  req.session.destroy(function (err) {
      res.redirect('/');
  });
});
router.post('/login', function(req, res, next) {
   var name=req.body.name;
   var pass=req.body.pass;
   db.read('user',{
   	name:name,
   	pass:pass
   },function(result){
     if(result.length===1){
       req.session.user=result[0];
       res.json({
         err:false
       });
     }else{
      res.json({
         err:true
       });
     }
   });
});


module.exports = router;
