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
    template: '<header class="intro-header" style="background-image: url(/public/img/home-bg.jpg)"><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class="site-heading"><h1>Clean Blog</h1><hr class="small"><span class="subheading">A Clean Blog Theme by Start Bootstrap</span></div></div></div></div></header> '+
    '<div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">'+
    '<div v-for="post in posts" class="post-preview"><a v-link="\'/post/\'+post._id"><h2 class="post-title">{{post.title}}</h2><h3 class="post-subtitle">{{post.blockquote}}</h3></a><p class="post-meta">Posted by<a>{{post.name}}</a>{{post.time}}</p></div>'+
    '<hr><ul class="pager"><li class="next"><a href="#">Older Posts &rarr;</a></li></ul></div></div></div>',
    data:function(){
      return {
        name:'home',
        posts:[]
      }
    },
    ready:function(){
      var _self=this;
      $.ajax({
           type: "GET",
           url: "/api/post",
           data:_self.post,
           dataType: "json",
           success: function(data){
             if(data.err){

             }else{
               //console.log(data.id);
               //router.go('/list');
               console.log(data);
               _self.posts=data.result;
             }
           }
       });
    }
});
var post = Vue.extend({
    template: '<div class="form-group">'+
    '<input type="text" class="form-control" id="title" v-model="post.title" placeholder="title"></div>'+
    '<div class="form-group"><input type="text" class="form-control" id="tags" v-model="post.tags" placeholder="tags"></div>'+
    '<div class="form-group"><label for="file">File</label><input type="file" id="file"></div>'+
    '<div class="form-group"><textarea class="form-control" rows="3" v-model="post.blockquote" placeholder="blockquote"></textarea></div>'+
    '<div class="form-group"><textarea class="form-control editable" rows="10" v-model="post.textarea" placeholder="textarea"></textarea></div>'+
    '<button type="submit" class="btn btn-default" @click="save">Post</button>',
    data:function(){
      return {
        name:'home'
      }
    },
    methods:{
      save:function(){
        var _self=this;
        console.log(this.post);
        $.ajax({
             type: "POST",
             url: "/api/post",
             data:_self.post,
             dataType: "json",
             success: function(data){
               if(data.err){

               }else{
                 //console.log(data.id);
                router.go('/list');
               }
             }
         });
        //
      }
    },
    ready:function(){
      var editor = new MediumEditor('.editable', {
          /* These are the default options for the editor,
              if nothing is passed this is what is used */
          activeButtonClass: 'medium-editor-button-active',
          allowMultiParagraphSelection: true,
          buttonLabels: false,
          contentWindow: window,
          delay: 0,
          disableReturn: false,
          disableDoubleReturn: false,
          disableExtraSpaces: false,
          disableEditing: false,
          elementsContainer: false,
          extensions: {},
          ownerDocument: document,
          spellcheck: true,
          targetBlank: false,
          toolbar: {
              buttons: ['bold', 'italic', 'quote','image','h1','h2','h3'],
              diffLeft: 25,
              diffTop: 10,
          },
          paste: {
              cleanPastedHTML: true,
              cleanAttrs: ['style', 'dir'],
              cleanTags: ['label', 'meta']
          },
          anchor: {
              placeholderText: 'Type a link',
              customClassOption: 'btn',
              customClassOptionText: 'Create Button'
          },
          anchorPreview: {
              hideDelay: 300
          },
          placeholder: {
              text: 'Click to edit'
          }
      });
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
