var express = require('express');
var router = express.Router();
var check_weixin=require('../lib/check_weixin.js');
var request = require('request');
var sign = require('../lib/sign.js');
var robot = require('../lib/robot.js');
var db = require('../lib/db.js');
var xml2js = require('xml2js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var echostr=req.query.echostr;
  check_weixin(req,function(){
    res.send(echostr);
  },function(){
    res.send('err');
  });
});
router.post('/', function(req, res, next) {

  var echostr=req.query.echostr;
  check_weixin(req,function(){
    //响应来自微信的内容
    xml2js.parseString(req.body,{ explicitArray : false, ignoreAttrs : true }, function(err, result){
      //var json_result=JSON.stringify(result);
      var json_result=result.xml;
      console.dir(json_result);

      //可以做热词分析
      /*
      //获得access_token
      //var appid='wxc20ab067a2541370';
      //var secret='ee3833c885e1b55a1543ecfca60f6ba9';
      var appid='wx31c151b39663cd8d';
      var secret='31d4de7be111ffb6bb1f63756fa383d9';
      var get_access_token_url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+secret;
      request(get_access_token_url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //
          var access_token=JSON.parse(body).access_token;
          console.log(access_token);
        }else{
          //err
        }
      });
      */
      if(json_result.MsgType==="text"){
        //文字消息
        //用户发送的消息
        var user_say=json_result.Content;

        //用机器人给返回去
        robot(user_say,function(say){
          console.dir("msg:"+json_result.Content);
          var builder = new xml2js.Builder();  // JSON->xml
          var json={
            xml:{
              ToUserName:json_result.FromUserName,
              FromUserName:'hhcc365',//开发者账号
              CreateTime:Date.now(),
              MsgType:'text',
              Content:say
            }
          }
          //存储问答

          var msg_data={
              FromUserName:json_result.FromUserName,
              CreateTime:json_result.CreateTime,
              ask:user_say,
              robot_say:say
          };


          db.create('msgs',msg_data,function(){});

          var xml =  builder.buildObject(json);
          res.setHeader('Content-Type', 'text/xml');
          res.send(xml);
        });
      }

      if(json_result.MsgType==="image"){
        //图片消息
        console.dir("pic:"+json_result.PicUrl);
        res.send(echostr);
      }

    });

    //res.send(echostr);


  },function(){
    res.send('err');
  });
});
router.get('/sign', function(req, res, next) {
  //res.json(req.local.wxconfig);
  request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx6a0490655d008b70&secret=70369747a6d0cbec973c86a47116ed7e', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.setHeader('Content-Type', 'text/json');
      res.send(body);
    }else{
      res.send(error);
    }
  });

});

router.get('/sign_2/:access_token', function(req, res, next) {
  var access_token=req.params.access_token;
  request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token+'&type=jsapi', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.setHeader('Content-Type', 'text/json');
      res.send(body);
    }else{
      res.send(error);
    }
  });
});

router.post('/sign_3', function (req, res, next) {
  var url=req.body.url;
  var jsapi_ticket=req.body.jsapi_ticket;
  var obj=sign(jsapi_ticket,url);
  res.setHeader('Content-Type', 'text/json');
  res.json(obj);
});
router.get('/msgs', function (req, res, next) {
  db.get('msgs',{},function(result){
    res.setHeader('Content-Type', 'text/json');
    res.json(result);
  })
});
module.exports = router;
