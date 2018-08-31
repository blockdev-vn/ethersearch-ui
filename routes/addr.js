var express = require('express');
var router = express.Router();
var EthJsUtil = require('ethereumjs-util');
var Common = require('../libs/common');

router.get('/', function (req, res) {
  var addr = req.query.a;
  if (!EthJsUtil.isValidAddress(addr)) {
    res.redirect('./error');
  }
  req.app.blockchainApi.getAddressSummary(addr, (err, rs) => {
    console.log('GEt err');
    console.log(err);
    console.log(rs.data);
    if (err || !rs || rs.e) {
      res.redirect('./error');
    }

    var attachData = {
      title: 'address',
      address: addr
    }
    attachData = Object.assign(attachData, rs.data)
    attachData['Common'] = Common;
    attachData['EthJsUtil'] = EthJsUtil;
    res.render('addr', attachData);
  })
});

module.exports = router;
