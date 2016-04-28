$(document).ready(function(){
    $.getJSON('/wx/msgs',function(d){
        d.map(function(obj){
            console.dir(obj);
            var $li=$('<li class="ui-border-t"></li>');

            var $avatar=$('<div class="ui-avatar">');
            var $span=$('<span style="background-image:url(http://placeholder.qiniudn.com/100x100)"></span>');
            $span.appendTo($avatar);
            //$avatar.appendTo($li);

            var $info=$('<div class="ui-list-info"></div>');

            var $ask=$('<p></p>');
            $ask.text('用户：'+obj.ask);
            $ask.appendTo($info);

            var $answer=$('<p class="ui-list-info"></p>');
            $answer.text('机器人：'+obj.robot_say);
            $answer.appendTo($info);

            $info.appendTo($li);
            $li.appendTo($('.lists'));
        });
    });
});