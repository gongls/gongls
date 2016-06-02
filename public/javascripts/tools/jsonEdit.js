new Vue({
  el: '#content',
  data:function(){
    return {
      msg:'tom',
      json:{
          "Array": [1, 2, 3],
          "Boolean": true,
          "Null": null,
          "Number": 123,
          "Object": {"a": "b", "c": "d"},
          "String": "Hello World"
      }
    }
  },
  computed: {
    jsonStr: function () {
      return JSON.stringify(this.json);
    }
  },
  ready:function(){
    var container = document.getElementById("jsoneditor");
    var options = {};
    var editor = new JSONEditor(container, options);
    editor.set(this.json);
  }
});

          // get json
          //var json = editor.get();
