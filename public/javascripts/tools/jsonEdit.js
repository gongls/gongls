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
        ui_source:'none',
        ui_edit:'block',
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
    UI_source:function () {
      this.hide();
      this.display.ui_source='block';
    },
    UI_load_close:function(){
      this.hide();
    },
    UI_close_source:function () {
      this.hide();
      this.display.ui_edit='block';
    },
    UI_load:function(){
        this.hide();
        this.display.ui_load='block';
    },
    load:function(){
      this.json=JSON.parse(this.jsonStr);
      this.editor.set(this.json);
      this.hide();
      this.display.ui_edit='block';
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
