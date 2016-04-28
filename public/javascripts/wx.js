var url=location.href.split('#')[0];
$(document).ready(function(){
    $.get('/wx/sign',{},function(x){
        access_token=x.access_token;
        $.get('/wx/sign_2/'+access_token,{},function(x){
            jsapi_ticket=x.ticket;
            console.log(jsapi_ticket);
            $.post('/wx/sign_3',{
                url:url,
                jsapi_ticket:jsapi_ticket
            },function(x){
                console.log(x.signature);
                //
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx6a0490655d008b70', // 必填，公众号的唯一标识
                    timestamp: x.timestamp,// 必填，生成签名的时间戳
                    nonceStr: x.nonceStr, // 必填，生成签名的随机串
                    signature: x.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                //
            });
        });
    });
    share={
        title:document.title,
        link:url,
        imgUrl:'http://h5.gongls.com/images/logo.png',
        desc:'',
        success:function(){

        },
        cancel:function(){

        }
    };
    wx.ready(function(){
        console.log('wx ready');
        //
        wx.error(function(res){
            console.log(res);
        });
        updateShare(share);
        //
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
    updateShare=function(share){
        wx.onMenuShareTimeline({
            title:share.title, // 分享标题
            link:share.link, // 分享链接
            imgUrl:share.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                share.success();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                success.cancel();
            }
        });
        wx.onMenuShareAppMessage({
            title:share.title, // 分享标题
            desc:share.desc, // 分享描述
            link:share.link, // 分享链接
            imgUrl:share.imgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                share.success();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                share.cancel();
            }
        });
    }
});