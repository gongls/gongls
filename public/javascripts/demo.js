$(document).ready(function(){
	var json=[{"name":"神经病","time_points":[{"time":"2016-05-03","value":3,"unit":""},{"time":"2016-05-06","value":30,"unit":""},{"time":"2016-05-09","value":6,"unit":""},{"time":"2016-05-19","value":18,"unit":""}]},{"name":"自闭症","time_points":[{"time":"2016-05-01","value":1,"unit":""},{"time":"2016-05-06","value":5,"unit":""},{"time":"2016-05-09","value":16,"unit":""}]}];
	var timeline = Vue.extend({
		template: '<div class="btns"><canvas id="canvas"></canvas><textarea class="demo_jsonCodeEdit" v-model="jsonText"></textarea></div>',
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
	                draw:function(){
	                	var timeline=new TimeLine();
		                   //初始化画布
		                   var width=$('#content').width();
		                   var height=width;
		                   timeline.init(width,height,10,'canvas');
		                   //清理画布
		                   timeline.clear();
		                   //设置画布背景色
		                   timeline.set_bgcolor("#fff");
		                   //绘制坐标
		                   timeline.coordinate('2016-05-01','2016-05-30',3);
		                   //绘制线
		                   timeline.drawlines(this.json);
		                   //绘制症状区域
		                   //timeline.text_areas(Symptoms);
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
	    }
	})
	router.start(App, '#content');
	//router.go('/a');
});