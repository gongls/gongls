$(document).ready(function(){
	var json=[
		{
			"name":"神经病",
			"time_points":[
				{
					"time":"2016-05-23",
					"value":3,
					"unit":""
				},
				{
					"time":"2016-05-06",
					"value":30,
					"unit":""
				},
				{
					"time":"2016-05-09",
					"value":6,
					"unit":""
				},
				{
					"time":"2016-05-19",
					"value":18,
					"unit":""
				}
			]
		},
	{"name":"自闭症","time_points":[{"time":"2016-05-01","value":1,"unit":""},{"time":"2016-05-06","value":5,"unit":""},{"time":"2016-05-09","value":16,"unit":""}]}];
	var timeline = Vue.extend({
		
		template: '<div class="btns">'+
			  '<button @click="draw()">全部</button>'+
			  '<button v-for="line in json" @click="draw_line(line)">{{line.name}}</button>'+
		'</div>'+
		'<canvas id="canvas"></canvas>'+
		'<textarea class="demo_jsonCodeEdit" v-model="jsonText"></textarea>',
		data: function () {
	                return { 
	                	message: 'hello' ,
	                	json:json,
	                	jsonText:JSON.stringify(json)
	            	   }
	              },
	              methods: {
	                doSomething: function () {
	                  this.message = this.message.split('').reverse().join('')
	                },
	                draw_line:function(line){
	                	console.log(line);
	                	
	                	var timeline=new TimeLine();
		                   //初始化画布
		                   var width=$('#content').width();
		                   var height=width/2;
		                   timeline.init(width,height,10,'canvas');
		                   //清理画布
		                   timeline.clear();
		                   //设置画布背景色
		                   timeline.set_bgcolor("#fff");
		                   //绘制坐标
		                   timeline.coordinate('2016-05-01','2016-05-30',3);
		                   //绘制线
		                   timeline.drawline(line);
	                },
	                draw:function(){
	                	var timeline=new TimeLine();
		                   //初始化画布
		                   var width=$('#content').width();
		                   var height=width/2;
		                   timeline.init(width,height,10,'canvas');
		                   //清理画布
		                   timeline.clear();
		                   //设置画布背景色
		                   timeline.set_bgcolor("#fff");
		                   
		                   //绘制线
		                   timeline.setlines(this.json);
		                   //绘制坐标
		                   timeline.coordinate(timeline.begin_time,timeline.end_time,3);
		                   timeline.drawlines();
		                   //绘制症状区域
		                   timeline.text_areas([
    {
      "name":"摔东西",
      "desc":"发作起来什么都砸",
      "time_area":{
        "start_time":"2016-05-03",
        "end_time":"2016-05-10"
      }
    },
    {
      "name":"发飙",
      "desc":"见到谁都跟喷火壶一样",
      "time_area":{
        "start_time":"2016-05-15",
        "end_time":"2016-05-29"
      }
    }
  ]);
	                }
	              },
	             watch: {
		      jsonText(val,oldVal) {
		      	var _self=this;
		    	_self.$set('json', JSON.parse(val));
		    	_self.draw();
		      console.log(val,oldVal);
		    }
		},
		ready:function(){
			this.draw();
		}
	});
	var check = Vue.extend({
		template: '<div class="form-group">'+
				'<p @click="doSomething">{{ message.length }}/20 {{msg}}</p>'+
				'<input maxlength="20" class="form-control" v-model="message">'+
				'<button class="btn btn-raised btn-info">ok</button>'+
			    '</div>',
		data: function () {
	                return { 
	                	message: 'hello' ,
	                	msg:''
	            	   }
	              },
	              methods: {
	                doSomething: function () {
	                  this.message = this.message.split('').reverse().join('')
	                }
	              },
	             watch: {
		    message(val,oldVal) {
		      console.log(val,oldVal);
		      if(val.length>20){
		      	this.msg='!'
		      }
		    }
		  }
	});
	var undersore = Vue.extend({
		template: '<div class="form-group">'+
				'<p>{{ outarrString }}</p>'+
				'<textarea maxlength="20" class="form-control" v-model="inarrString"></textarea>'+
				'<button @click="doit" class="btn btn-raised btn-info">ok</button>'+
			    '</div>',
		data: function () {
	                return { 
	                	message: 'hello' ,
	                	json:[
	                		{
	                			name:"a",
	                			time_points:[
	                				{name:"a",value:1,time:'2015-12-02'},
	                				{name:"b",value:3,time:'2015-05-06'},
	                				{name:"c",value:2,time:'2016-01-01'}
	                			]
	                		},
	                		{
	                			name:"b",
	                			time_points:[
	                				{name:"a",value:1,time:'2015-12-02'},
	                				{name:"b",value:3,time:'2015-05-06'},
	                				{name:"c",value:2,time:'2014-01-01'}
	                			]
	                		},
	                		
	                	],
	                	inarrString:'',
	                	outarrString:''

	            	   }
	              },
	              methods: {
	                doit: function () {
	                  this.json= JSON.parse(this.inarrString);
	                  this.json.map(function(obj,index,objs){
	                  	obj.time_points.sort(function(a,b){
			          return Date.parse(a.time) - Date.parse(b.time);//时间正序
			});
	                  	//objs[index]=obj;
	                  });
	                  this.outarrString=JSON.stringify(this.json);
	                }
	              },
	             watch: {
		    message(val,oldVal) {
		      console.log(val,oldVal);
		      if(val.length>20){
		      	this.msg='!'
		      }
		    }
		},
		ready:function(){

			this.inarrString=JSON.stringify(this.json);
		}
	});
	var App = Vue.extend({})
	var router = new VueRouter()
	router.map({
	    '/allergens': {
	      //
	      component: function (resolve) {
	        $.get('/api/template/allergens',function(html){
	          var MyComponent = Vue.extend({
	             //template: '<p @click="doSomething">{{ message }}</p>',
	             template: html,
	              data: function () {
	                return { message: 'hello' }
	              },
	              methods: {
	                doSomething: function () {
	                  this.message = this.message.split('').reverse().join('')
	                }
	              }
	          })
	          resolve(MyComponent);
	          //

	          //
	       });
	      }
	      //
	    },
	    '/check': {
	        component: check
	    },
	    '/timeline': {
	        component: timeline
	    },
	    '/undersore':{
	    	component:undersore
	    }
	})
	router.start(App, '#content');
	//router.go('/a');
});