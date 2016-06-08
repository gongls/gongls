new Vue({
  el: '#content',
  data:function(){
    return {
      msg:'tom',
      editor:null,
      jsonStr:null,
      json:{
        
      }
    }
  },
  methods:{
    load:function(){
      this.json=JSON.parse(this.jsonStr);
      this.editor.set(this.json);
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
