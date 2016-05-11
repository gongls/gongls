$(document).ready(function(){
	var check = Vue.extend({
		template: '<div class="form-group">'+
				'<p @click="doSomething">{{ message.length }}/20 {{msg}}</p>'+
				'<input maxlength="20" class="form-control" v-model="message">'+
				'<button class="btn btn-primary">ok</button>'+
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
	    }
	})
	router.start(App, '#content');
	//router.go('/a');
});