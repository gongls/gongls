
//选项卡
$(function(){
    function tabs(tabTit,on,tabCon){
        $(tabTit).children().click(function(){
            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tabTit).children().index(this);
           	$(tabCon).children().eq(index).show().siblings().hide();
    	});
	};
    tabs(".tab-hd","active",".tab-bd");
});
//软键盘冲突
$(function(){
		var scrtop,addcon,conindex;
    $(".form-row-con input").focus(function(){
    	conindex=$(".form-row-con input").index(this);
    	scrtop=(conindex-3)*120;
    	addcon=$(".main-con").height();
    	$(".psw-form").css("height",addcon+scrtop);
    	$(".main-con").scrollTop(scrtop);
    });
    $(".form-row-con input").blur(function(){   	
	   	$(".psw-form").css("height","auto");   	
	   	$(".main-con").scrollTop("0");
    });
 	
});


//textarea高度适应
$.fn.autoHeight = function() {

	function autoHeight(elem) {
		elem.style.height = 'auto';
		elem.scrollTop = 0; //防抖动
		elem.style.height = elem.scrollHeight + 'px';
	}

	this.each(function() {
		autoHeight(this);
		$(this).on('keyup', function() {
			autoHeight(this);
		});
	});

}

$('textarea[autoHeight]').autoHeight();