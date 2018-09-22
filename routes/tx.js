var express = require('express');
var router = express.Router();
var Common = require('../libs/common');
/* GET tx page. */
router.get('/', function (req, res, next) {

  var hash = (req.query.hash) || '';
  if (hash.length == 64) {
    hash = '0x' + hash;
  }
  if (hash.length != 66) {
    return res.redirect('./error');

  }
  req.app.blockchainApi.getTx(hash, (err, rs) => {
    if (err || !rs || rs.e) {
      return res.redirect('./error');
    }

    var attachData = {
      title: 'Tranasction ' + hash,
    }
    attachData['tx'] = rs.data;
    attachData['Common'] = Common;

    res.render('tx', attachData);
  })
});

module.exports = router;
