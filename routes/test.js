var express = require('express');
var router = express.Router();
var xml2js = require('xml2js');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'test' });
});
router.get('/xml', function(req, res, next) {
  var builder = new xml2js.Builder();  // JSON->xml
  var json={
    xml:{
      ToUserName:'tom',
      //FromUserName:'gh_68713e18d2bf',//开发者账号
      FromUserName:'hhcc365',//开发者账号
      CreateTime:Date.now(),
      MsgType:'text',
      Content:'hello!'
    }
  }
  var xml =  builder.buildObject(json);
  res.setHeader('Content-Type', 'text/xml');
  res.send(xml);
});

router.get('/robot/:input', function(req, res, next) {
  var url="http://baike.baidu.com/subview/3987/8076852.htm?fromtitle="+input+"&type=syn";
  //这里用图灵机器人
  var input=req.params.input;
  console.log(input);
  var url="http://www.tuling123.com/openapi/api";
  request.post({url:url, form: {key:'2a85851a4eea7a2fe1288b4e0ab0fcba',info:input}},function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json=JSON.parse(body);
      var msg_data={
        FromUserName:'test_user',
        CreateTime:Date.now(),
        ask:input,
        robot_say:json.text
      };
      db.add('msgs',msg_data,function(){});
      res.send(json.text);
    }else{
      res.send('err');
    }
  });
});
module.exports = router;
