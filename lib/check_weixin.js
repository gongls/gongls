module.exports=function(req,cb,err){
    var signature=req.query.signature;
    var timestamp=req.query.timestamp;
    var nonce=req.query.nonce;
    var echostr=req.query.echostr;
    var token='00990000';
    var array = new Array(token,timestamp,nonce);
    array.sort();
    var str = array.toString().replace(/,/g,"");
    jsSHA = require('jssha');
    console.log('jsSHA:');
    var shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.update(str);
    var hash = shaObj.getHash("HEX");
    console.log({
        signature:signature,
        timestamp:timestamp,
        nonce:nonce,
        echostr:echostr,
        hash:hash
    });
    if(hash===signature){
        //from weixin server
        console.log('check success');
        cb();
    }else{
        //not from weixin server
        err();
        console.log('check unsuccess');
    }
}