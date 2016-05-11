$(document).ready(function(){
	var a = Vue.extend({
		template: '<p @click="doSomething">A {{ message }}</p><input class="form-control" v-model="message">',
		data: function () {
	                return { message: 'hello' }
	              },
	              methods: {
	                doSomething: function () {
	                  this.message = this.message.split('').reverse().join('')
	                }
	              },
	             watch: {
		    message(val,oldVal) {
		      console.log(val,oldVal);
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
	    '/a': {
	        component: a
	    }
	})
	router.start(App, '#content');
	//router.go('/a');
});