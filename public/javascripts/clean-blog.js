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
    template: '<header class="intro-header" style="background-image: url(/public/img/home-bg.jpg)"><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="site-heading"><h1>Clean Blog</h1><hr class="small"><span class="subheading">A Clean Blog Theme by Start Bootstrap</span></div></div></div></div></header> '+
    '<div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="post-preview"><a href="post.html"><h2 class="post-title">                            Man must explore, and this is exploration at its greatest</h2><h3 class="post-subtitle">                            Problems look mighty small from 150 miles up</h3></a><p class="post-meta">Posted by<a href="#">Start Bootstrap</a> on September 24, 2014</p></div><hr><ul class="pager"><li class="next"><a href="#">Older Posts &rarr;</a></li></ul></div></div></div>',
    data:function(){
      return {
        name:'home'
      }
    },
    ready:function(){

    }
});
var about = Vue.extend({
    template: '<header class="intro-header" style="background-image: url(/public/img/about-bg.jpg)">'+
    '<div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="page-heading"><h1>About Me</h1><hr class="small"><span class="subheading">This is what I do.</span></div></div></div></div></header>'+
    '<div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">'+
    '<h3 本站使用如下技术</h3><p>服务器：ubuntu server </p><p>基于 on node.js 技术构建  </p> <p>使用了如下技术：        </p><p>1) 后端框架：express</p><p> 2) 数据库：mongodb </p>       <p>3) 模板引擎：pug ( 原名jade )         </p><p>4) 前端路由：vue-router     </p><p>5) 前端框架：vue.js / jquery.js</p><p>6) UI/style：bootstrap / bootstrap-material-design</p>'+
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
    template: '<header class="intro-header" style="background-image: url(public/img/contact-bg.jpg)"><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="page-heading"><h1>Contact Me</h1><hr class="small"><span class="subheading">Have questions? I have answers (maybe).</span></div></div></div></div></header><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><p>Want to get in touch with me? Fill out the form below to send me a message and I will try to get back to you within 24 hours!</p></div></div></div>',
    data:function(){
      return {
        name:'contact'
      }
    },
    ready:function(){

    }
});
var post = Vue.extend({
    template: '<header class="intro-header" style="background-image: url(/public/img/post-bg.jpg)"><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="post-heading"><h1>Man must explore, and this is exploration at its greatest</h1><h2 class="subheading">Problems look mighty small from 150 miles up</h2><span class="meta">Posted by<a href="#">Start Bootstrap</a> on August 24, 2014</span></div></div></div></div></header><article><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><p>ppp</p><h2 class="section-heading">The Final Frontier</h2><p>pppp</p><blockquote>hehe</blockquote><h2 class="section-heading">Reaching for the Stars</h2><p>ppp</p><a href="#"><img class="img-responsive" src="/public/img/post-sample-image.jpg" alt=""></a><p>Placeholder text by<a href="http://spaceipsum.com/">Space Ipsum</a>. Photographs by<a href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a>.</p></div></div></div></article>',
    data:function(){
      return {
        name:'post'
      }
    },
    ready:function(){
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