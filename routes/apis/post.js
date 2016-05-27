var express = require('express');
var router = express.Router();
const auth = require('../../middleware/auth');
var db=require('../../lib/db');
var ObjectId = require('mongodb').ObjectID;

/* GET users listing. */

router.post('/',auth.api,function(req, res, next) {
  var obj=req.body;
  var time=new Date();
  obj.time=time;
  obj.author=req.session.user.name;
  //check
  db.create('posts',obj,function(id){
    res.json({
      err:false,
      id:id
    });
  });
});

router.get('/', function(req, res, next) {
  db.read('posts',{},function(result){
    res.json({
      err:false,
      result:result
    });
  });
});

router.get('/page/:page', function(req, res, next) {
  var page=req.params.page;
  page=parseInt(page);
  var OlderPage=page+1;
  if(page<2){
    page=1;
  }



  var onePageCount=10;
  var skip=(page-1)*onePageCount;


  db.find('posts',{},{
    sort:{
      _id:-1
    },
    limit:onePageCount,
    skip:skip
  },function(result){
    res.json({
      err:false,
      OlderPage:OlderPage,
      result:result
    });
  });
});

router.get('/:id', function(req, res, next) {
	var id=req.params.id;
  db.read('posts',{'_id':ObjectId(id)},function(result){
    if(result.length===1){
      res.json({
        err:false,
        result:result[0]
      });
    }
    if(result.length===0){
      res.json({
        err:false,
        result:null
      });
    }

  });
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
