// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;
    //primary navigation slide-in effect
    //nav
    $('.nav_menu').click(function(){
      setTimeout(function(){
        $('#nav_btn').click();
      },300);
    });
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});
var home = Vue.extend({
    template: '<header class="intro-header" style="background-image: url(/public/img/home-bg.jpg)"><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="site-heading"><h1>{{blog.title}}</h1><hr class="small"><span class="subheading">{{blog.subTitle}}</span></div></div></div></div></header> '+
    '<div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">'+
    '<div v-for="post in posts" class="post-preview"><a v-link="\'/post/\'+post._id"><h2 class="post-title">{{post.title}}</h2><h3 class="post-subtitle">{{post.blockquote}}</h3></a><p class="post-meta">Posted by <a>{{post.author}}</a> {{post.time}}</p></div>'+
    '<hr><ul class="pager"><li class="next"><a v-link="\'/page/\'+OlderPage">Older Posts &rarr;</a></li></ul></div></div></div>',
    data:function(){
      return {
        name:'home',
        blog:{
          title:'张玛妮',
          subTitle:'我只是一个美少女画家'
        },
        posts:[],
        OlderPage:0
      }
    },
    ready:function(){
      var _self=this;
      $.ajax({
           type: "GET",
           url: "/api/post/page/0",
           data:_self.post,
           dataType: "json",
           success: function(data){
             if(data.err){

             }else{
               //console.log(data.id);
               //router.go('/list');
               console.log(data);
               var posts=data.result;
               posts.map(function(post){
                 var author=post.author;
                 if(author===undefined){
                   author="unknow";
                   post.author=author;
                 }
                 var time=post.time;
                 time=(new Date(time)).toLocaleDateString();
                 time=time.replace('Invalid Date','');
                 post.time=time;
               });
               _self.posts=posts;
               _self.OlderPage=data.OlderPage;
             }
           }
       });
    }
});
var about = Vue.extend({
    template: '<header class="intro-header" style="background-image: url(/public/img/about-bg.jpg)">'+
    '<div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="page-heading"><h1>About Me</h1><hr class="small"><span class="subheading">新浪微博 @张玛妮</span></div></div></div></div></header>'+
    '<div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">'+
    '<h3>本站使用如下技术</h3><p>服务器：ubuntu server </p><p>基于 on node.js 技术构建  </p> <p>使用了如下技术：        </p><p>1) 后端框架：express</p><p> 2) 数据库：mongodb </p>       <p>3) 模板引擎：pug ( 原名jade )         </p><p>4) 前端路由：vue-router     </p><p>5) 前端框架：vue.js / jquery.js</p><p>6) UI/style：bootstrap / bootstrap-material-design</p><p>新浪微博 @张玛妮</p>'+
    '</div></div></div>',
    data:function(){
      return {
        name:'about'
      }
    },
    ready:function(){

    }
});
var contact = Vue.extend({
    template: '<header class="intro-header" style="background-image: url(public/img/contact-bg.jpg)"><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="page-heading"><h1>Contact Me</h1><hr class="small"><span class="subheading">新浪微博 @张玛妮</span></div></div></div></div></header><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><p>Want to get in touch with me? Fill out the form below to send me a message and I will try to get back to you within 24 hours!</p></div></div></div>',
    data:function(){
      return {
        name:'contact'
      }
    },
    ready:function(){

    }
});
var post = Vue.extend({

    template: '<header class="intro-header" style="background-image: url(/public/img/post-bg.jpg)"><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="post-heading"><h1>{{post.title}}</h1><h2 class="subheading"></h2><span class="meta">Posted by <a>{{post.author}}</a>{{post.time}}</span></div></div></div></div></header><article><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><h2 class="section-heading">{{post.title}}</h2><blockquote>{{post.blockquote}}</blockquote>{{post.textarea}}</div></div></div></article>',
    data:function(){
      return {
        post:null
      }
    },
    ready:function(){
      var $route=this.$route;
      var id=$route.params.id;
      //
      var _self=this;
      $.ajax({
           type: "GET",
           url: "/api/post/"+id,
           data:{},
           dataType: "json",
           success: function(data){
             if(data.err){

             }else{
               //console.log(data.id);
               //router.go('/list');
               console.log(data);
               //
              var post=data.result;
              var time=post.time;
              time=(new Date(time)).toLocaleDateString();
              time=time.replace('Invalid Date','');
              post.time=time;
               //
               _self.post=post;
             }
           }
       });
      //
    }
});
var App = Vue.extend({});
var router = new VueRouter()
  router.map({
      '/': {
          component: home
      },
      '/contact': {
          component: contact
      },
      '/about':{
        component:about
      },
      '/post/:id':{
        component:post
      }
  })
  router.start(App, '#content');
  router.go('/');
