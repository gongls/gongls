new Vue({
  el: '#login',
  data: {
    message: ''
  },
  methods: {
    login:function(){
    	var name=this.name;
    	var pass=this.pass;
    	var _self=this;
    	$.post('/api/user/login',{name:name,pass:pass},function(x){
    		console.log(x);
    		if(x.err){
    			_self.message='login err !';
    		}else{
    			window.location.href=_self.return_url;
    		}
    	})
    }
  },
  ready:function(){
  	this.message="login"
  }
})