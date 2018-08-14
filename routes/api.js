var express = require('express');
var router = express.Router();
var EthJsUtil = require('ethereumjs-util');
var Common = require('../libs/common');

router.get('/addr/erc20/txs', function (req, res) {
  var addr = req.query.a;
  var contractAddr = req.query.c;
  if (!EthJsUtil.isValidAddress(addr) || !EthJsUtil.isValidAddress(contractAddr)) {
    return res.redirect('./error');
  }
  console.log(addr, contractAddr);
  req.app.blockchainApi.getERC20History(addr, contractAddr, (err, rs) => {
    console.log('GEt err');
    console.log(err);
    console.log(rs);
    if (err || !rs || rs.e) {
      return res.redirect('./error');
    }
    res.json(rs)
  })
});

module.exports = router;
