var express = require('express');
var router = express.Router();
var Common = require('../libs/common');
/* GET contract page. */
router.get('/', function (req, res, next) {
  req.app.blockchainApi.getLatestContract((err, rs) => {
    if (err || !rs || rs.e) {
      return res.redirect('./error');
    }

    var attachData = {
      title: 'Contract list',
    }
    attachData['contracts'] = rs;
    attachData['Common'] = Common;

    res.render('contracts', attachData);
  })
});

module.exports = router;
