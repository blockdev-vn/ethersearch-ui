var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var blocks = req.app.blocks || [];
  var attachData = {
    title: "Home",
    blocks: blocks
  }
  res.render('index', attachData);
});

module.exports = router;
