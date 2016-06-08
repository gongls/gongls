new Vue({
  el: '#content',
  data:function(){
    return {
      msg:'tom',
      editor:null,
      jsonStr:null,
      json:{
        
      },
      display:{
        ui_load:'none',
        ui_source:'none'
      }
    }
  },
  methods:{
    hide:function(){
      this.display={
        ui_load:'none',
        ui_source:'none',
        ui_edit:'none',
      }
    },
    download:function(){

    },
    UI_show:function(name){
      var _self=this;
      setTimeout(function(){
        _self.hide();
        if(name===undefined){

        }else{
          _self.display[name]='block';
        }
      },500);
    },
    UI_source:function () {
      this.UI_show('ui_source');
    },
    UI_load_close:function(){
      this.UI_show();
    },
    UI_close_source:function () {
      this.UI_show();
    },
    UI_load:function(){
        this.UI_show('ui_load');
    },
    load:function(){
      this.json=JSON.parse(this.jsonStr);
      this.editor.set(this.json);
      this.UI_show('ui_edit');
    }
  },
  computed: {
    out:function(){
      //this.json=JSON.parse(this.jsonStr);
      //this.editor.set(this.json);
      this.json=this.editor.get();
      return JSON.stringify(this.json, null, 2);
    }
  },
  ready:function(){
    var container = document.getElementById("jsoneditor");
    var options = {};
    this.editor = new JSONEditor(container, options);
    //this.json=JSON.parse(this.jsonStr);
    this.editor.set(this.json);
  }
});
