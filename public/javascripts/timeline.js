//天数差 计算方法：



Date.DateDiff=function(startTime, endTime){    //sDate1和sDate2是2002-12-18格式
    function GetDateDiff(startTime, endTime, diffType) {
      //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
      startTime = startTime.replace(/\-/g, "/");
      endTime = endTime.replace(/\-/g, "/");
      //将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase();
      var sTime = new Date(startTime);      //开始时间
      var eTime = new Date(endTime);  //结束时间
      //作为除数的数字
      var divNum = 1;
      switch (diffType) {
          case "second":
              divNum = 1000;
              break;
          case "minute":
              divNum = 1000 * 60;
              break;
          case "hour":
              divNum = 1000 * 3600;
              break;
          case "day":
              divNum = 1000 * 3600 * 24;
              break;
          default:
              break;
      }
      return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
  }
  return Math.abs(GetDateDiff(startTime, endTime,'day'));
}
//日期 加法
Date.addDate=function(date,days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var month=d.getMonth()+1;
    var day = d.getDate();
    if(month<10){
        month = "0"+month;
    }
    if(day<10){
        day = "0"+day;
    }
    var val = d.getFullYear()+"-"+month+"-"+day;
    return val;
}

var TimeLine=function(){
  var width=0;
  var height=0;
  var padding=0;
  var timeline_width=0;//线的长度
  var timeline_height=0;//线的最高高度
  var c=null;
  var start_time=0;
  var end_time=0;

}
TimeLine.prototype={
  init:function(width,height,padding,canvas_el_id){
    this.colors=[
      '#f00',
      '#3300FF',
      '#FFD801',
      '#00FFFB'
    ];
    //初始化画布  宽度 高度 padding 间距 canvas元素id
    console.log('初始化timeline');
    var canvas = document.getElementById(canvas_el_id);
    console.log(canvas_el_id);

    canvas.width = width;
    canvas.height = height;
    this.timeline_width=width-padding-padding;//线的长度 等于 width 减去 两个 padding
    this.timeline_height=height/2;//线的最高高度
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    //canvas 外边框的大小
    $('.canvas').css('width',width);
    $('.canvas').css('height',height);
    c = canvas.getContext('2d');
    this.c=c;
    this.width=width;
    this.height=height;
    this.padding=padding;
    console.log('初始化timeline ok');
  },
  painter:function(){
    console.log('painter');
  },
  //清理画布
  clear:function(){
    this.c.clearRect(0,0,this.width,this.height);
  },
  //设置画布的背景色
  set_bgcolor:function(color){
    console.log('绘制背景色');
    var c=this.c;
    c.fillStyle=color;
    c.fillRect(0,0,this.width,this.height);
  },
  //绘制坐标线 开始时间，结束时间，时间间隔
  coordinate:function(start_time,end_time,time_intervals){

    this.start_time=start_time;
    this.end_time=end_time;
    var timeline_width=this.timeline_width;
    //计算单位宽度
    var time_count=Date.DateDiff(start_time,end_time);//时间数量
    var every_width=timeline_width/time_count;
    this.time_count=time_count;
    this.every_width=every_width;
    var c=this.c;
    var padding=this.padding;
    var width=this.width;
    var height=this.height;
    var timeline_width=this.timeline_width;
    var timeline_height=this.timeline_height;
    console.log(c);
    console.log('绘制 中间的线 开始');
    //
    //
    //绘制左端竖线开始
    c.beginPath();
    c.strokeStyle='#f00';
    c.moveTo(padding,padding);
    c.lineTo(padding,height-padding);
    c.stroke();
    c.closePath();
    //绘制左端竖线结束

    //绘制 中间的线 开始
    console.log(padding,height/2);
    c.beginPath();
    c.strokeStyle='#f00';
    c.fillStyle = "#f00";
    c.moveTo(padding,height/2);
    c.lineTo(width-padding,height/2);
    c.stroke();
    c.closePath();
    //绘制 中间的线 结束
    //绘制时间节点
    //绘制时间线上的时间节点
    //获得天数 1年365天

    var begin_day=start_time;//开始日期
    var end_day=end_time;//结束日期
    var days=Date.DateDiff(end_day,begin_day);//一共多少天？

    console.log('days:'+days);
    var day_width=timeline_width/days;//每天 的距离

    var day_tmp=-1;//用于计算时间间隔的临时变量
    var day_padding=time_intervals;//时间间隔
    if(days<=7){
        day_padding=1;//一周之内 时间间隔为1
    }

    for(i=0;i<days+1;i++){
        console.log(i);
        c.beginPath();
        //c.arc(padding+i*day_width,timeline_height,5,0,Math.PI*2,true);
        c.fillRect(padding+i*day_width,timeline_height-5,1,10);
        c.closePath();
        c.fill();
        //绘制时间节点下方的时间
        var font_size=10;//时间节点的字体大小
        var timeline_font_width=10*font_size;//
        c.font = font_size+"px Courier New";

        //获得文字的宽度
        var d=Date.addDate(begin_day,i);
        var font_width=c.measureText(d).width;//获取时间标签的宽度
        if(day_tmp===-1){
            c.fillText(d,padding+i*day_width-font_width/2, timeline_height+padding*3);
        }

        day_tmp+=1;

        if(day_tmp===day_padding){
            day_tmp=0;
            c.fillRect(padding+i*day_width,timeline_height-5,1,padding*2);//绘制时间的时间线要长一些

            //console.dir(font_width);
            c.fillText(d,padding+i*day_width-font_width/2,timeline_height+padding*3);
        }
    }
    //
  },
  drawlines:function(lines){
    var _self = this;
    console.log('colors',this.colors);
    lines.map(function(line,index){
      console.log(_self.colors);
      _self.drawline(line,_self.colors[index]);
    });
  },
  drawline:function(line,color){
    if(color===undefined){
      color=this.colors[0];
    }
    var time_count=this.time_count;//时间数量
    var every_width=this.every_width;//时间间隔长度
    var start_time=this.start_time;
    var end_time=this.end_time;
    var c=this.c;
    var padding=this.padding;
    var width=this.width;
    var height=this.height;
    var timeline_width=this.timeline_width;
    var timeline_height=this.timeline_height;
    //var time_line_name=line.name;
    var time_line_time_points=line.time_points;
    var max_value=0;//最大值作为 时间节点 的最上线 来划分 值的高度比例
    time_line_time_points.map(function(time_point){
      console.log(time_point);
      if(time_point.value>max_value){
        max_value=time_point.value;
      }
    });
    console.log('最大值是:',max_value);
    //
    var points=[];

    time_line_time_points.map(function(time_point){
      var unit=time_point.unit;//值的单位
      //根据最大值 的高度 和结束时间的宽度 来重构 点x、y
      var time=time_point.time;
      var value=time_point.value;

      var x=0;
      var y=0;

      //计算单位高度
      var every_height=timeline_height/max_value;
      /*//计算单位宽度
      var time_count=Date.DateDiff(start_time,end_time);//时间数量
      var every_width=timeline_width/time_count;
      */
      console.log('时间数量',time_count);
      console.log('timeline长度',timeline_width);
      console.log('单位时间长度',every_width);

      var this_time_index=Date.DateDiff(time,start_time);//当前时间是第几个
      console.log('本时间序列：',this_time_index);

      console.log('时间：',time,start_time);
      x=this_time_index*every_width+padding;
      y=value*every_height;
      y=timeline_height-y+padding;
      //如果在 时间区间内
      if(this_time_index<=time_count){
        //加入时间点
        points.push(
          {
            x:x,
            y:y,
            time:time,
            value:value,
            unit:unit,
            info:''
          }
        );
        //

        //
      }

      //
    });
    //循环节点
    var last_y=-1;
    var last_x=-1;
    points.map(function(point){
      console.log(point.x,point.y);
      //
      c.beginPath();
      c.strokeStyle=color;//时间线的颜色
      c.fillStyle=color;
      //如果是第一个数据
      if(last_y===-1 && last_x===-1){
          c.moveTo(point.x,point.y);
          c.lineTo(point.x,point.y);
      }else{
          //起始点为上一个point
          c.moveTo(last_x,last_y);
          c.lineTo(point.x,point.y);
      }
      //本次结果作为下次结果的上次结果
      last_x=point.x;//
      last_y=point.y;//
      c.stroke();
      c.closePath();
      //
      c.beginPath();
      //画原点，用于响应点击事件。
      c.arc(point.x,point.y,8,0,Math.PI*2,true);
      c.fill();
      c.closePath();
      //
      //画文字
      //绘制文字 和 点击区域
      c.font = "15px Courier New";
      var out_text=point.value+' '+point.unit;
      var font_width=parseInt(c.measureText(out_text).width);
      c.fillText(out_text,point.x-font_width/2,point.y+padding*3);
      //
      //
    });
    //
  },
  text_areas:function(areas){
    var _self=this;
    areas.map(function(area){
      _self.text_area(area);
    });
  },
  text_area:function(area){

    var timeline_width=this.timeline_width;
    var timeline_height=this.timeline_height;
    var padding=this.padding;
    console.log(area.time_area);
    var area_start_time=area.time_area.start_time;
    var area_end_time=area.time_area.end_time;

    console.log('area_start_time',area_start_time);
    console.log('area_end_time',area_end_time);
    var time_count=this.time_count;//时间数量
    var every_width=this.every_width;//时间间隔长度

    //开始的时间，位于多少时间单位
    var begin_index=Date.DateDiff(area_start_time,this.start_time);
    //结束的时间，距离开始的时间 多少时间单位
    var end_index=Date.DateDiff(area_end_time,area_start_time);


    var x=every_width*begin_index+padding;
    var y=timeline_height;
    var width=every_width*end_index;
    var height=timeline_height
    //c.strokeStyle=color;//时间线的颜色
    //根据开始时间和结束时间绘制矩形
    c.fillStyle="rgba(0,0,0,0.1)";
    c.fillRect(x,y,width,height);//绘制时间的时间线要长一些
    //根据开始时间和结束时间绘制矩形
    //绘制文字
    c.fillStyle="rgba(0,0,0,1)";
    c.font = "15px Courier New";
    var out_text=area.name;
    var font_width=parseInt(c.measureText(out_text).width);
    c.fillText(out_text,x+width/2-font_width/2,y+timeline_height/2);
    //
    //
  }
}