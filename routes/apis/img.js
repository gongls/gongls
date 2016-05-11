var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.send('img');
});
router.post('/uploadimg', function (req, res, next) {
  //
  if (req.session.user) {
    var formidable = require("formidable");
    var form = new formidable.IncomingForm();   //创建上传表单
    form.parse(req, function (err, fields, files) {
      var imgs = [];
      for (var key in files) {
        var file = files[key];
        //var fName = (new Date()).getTime();
        var fName = md5(fs.readFileSync(file.path));

        switch (file.type) {
          case "image/jpeg":
            fName = fName + ".jpg";
            break;
          case "image/png":
            fName = fName + ".png";
            break;
          default :
            fName = fName + ".png";
            break;
        }
        var uploadDir = path.resolve('public', 'upload', fName);

        imgs.push(fName);

        fs.rename(file.path, uploadDir, function (err) {
          if (err) {
            //res.json(err);
          } else {

          }
        });
      }
      res.json({err:false,imgs:imgs});
    });
  }else{
    res.json({err:true,msg:'not login'});
  }
});
module.exports = router;