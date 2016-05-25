$(document).ready(function(){
  $('#side-menu .nav_btn').click(function(){
    setTimeout(function(){
      $('#nav_btn').click();
    },500);
  });
});
var home = Vue.extend({
    template: '<h1 class="page-header">Title here</h1>',
    data:function(){
      return {
        name:'home'
      }
    },
    ready:function(){

    }
});
var list = Vue.extend({
    template: '<h1 class="page-header">Title here</h1>',
    data:function(){
      return {
        name:'home'
      }
    },
    ready:function(){

    }
});
var post = Vue.extend({
    template: '<h1 class="page-header">Title here</h1>',
    data:function(){
      return {
        name:'home'
      }
    },
    ready:function(){

    }
});
var edit = Vue.extend({

    template: '<h1 class="page-header">Title here</h1>',
    data:function(){
      return {
        name:'home'
      }
    },
    ready:function(){
       var $route=this.$route;
       var id=$route.params.id;
    }
});
var update = Vue.extend({

    template: '<h1 class="page-header">Title here</h1>',
    data:function(){
      return {
        name:'home'
      }
    },
    ready:function(){
       var $route=this.$route;
       var id=$route.params.id;
    }
});

var App = Vue.extend({});
var router = new VueRouter()
  router.map({
      '/': {
          component: home
      },
      '/post': {
          component: post
      },
      '/list':{
        component:list
      },
      '/update':{
        component:update
      },
      '/edit/:id':{
        component:edit
      }
  })
  router.start(App, '#content');
  router.go('/');
