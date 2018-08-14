var express = require('express');
var router = express.Router();
var EthJsUtil = require('ethereumjs-util');

/* GET tx page. */
router.get('/', function (req, res) {
  var query = req.query.d || '';
  if (EthJsUtil.isValidAddress(query)) {
    console.log("address");
    res.redirect('./addr?a=' + query);
  } else if (query.length == 64 || query.length == 66) {
    console.log("tx or block");
    res.redirect('./tx?hash=' + query);
  } else if (!isNaN(query, 10)) {
    console.log("Block")
    res.redirect('./block?number=' + query);
  } else {
    console.log("Unknown");
  }
});

module.exports = router;
