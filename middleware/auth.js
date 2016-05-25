const api = (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(403).json({
    	err:true,
    	msg:'forbidden'
    });
  }
  next();
};

const page = (req, res, next) => {
  if (!req.session || !req.session.user) {
    res.redirect('/login?return_url='+req.url);
  }
  next();
};

exports.api = api;
exports.page = page;
