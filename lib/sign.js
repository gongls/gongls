//jssdk ǩ���㷨
var createNonceStr = function () {
    return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

/**
 * @synopsis ǩ���㷨
 *
 * @param jsapi_ticket ����ǩ���� jsapi_ticket
 * @param url ����ǩ���� url ��ע����붯̬��ȡ������ hardcode
 *
 * @returns
 */
var sign = function (jsapi_ticket, url) {
    var ret = {
        jsapi_ticket: jsapi_ticket,
        nonceStr: createNonceStr(),
        timestamp: createTimestamp(),
        url: url
    };
    var string = raw(ret);
    jsSHA = require('jssha');
    console.log('jsSHA:');
    var shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.update(string);

    var hash = shaObj.getHash("HEX");
    console.log(hash);
    ret.signature = hash;
    return ret;
};

module.exports = sign;