//文本机器人
module.exports=function(input,cb){
    var request = require('request');

    var output=input;
    if(input==='你好'){
        output='你也好';
    }
    if(input.indexOf('干嘛呢')!=-1){
        output='想你呢！';
    }
    if(input.indexOf('你谁呀')!=-1){
        output='我是聊天机器人';
    }
    console.log('input:'+input);
    console.log('output:'+output);
    //这里用图灵机器人
    var url="http://www.tuling123.com/openapi/api";
    request.post({url:url, form: {key:'2a85851a4eea7a2fe1288b4e0ab0fcba',info:input}},function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json=JSON.parse(body);
            console.dir(json);
            if(json.url===undefined){
                //存储到数据库里
                cb(json.text);
            }else{
                cb(json.text+json.url);
            }
        }else{
            cb(output);
        }
    });
    //

}