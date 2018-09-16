var express = require('express');
var router = express.Router();
var EthJsUtil = require('ethereumjs-util');
var Common = require('../libs/common');
var error = {
  e: ''
}

router.get('/addr/erc20/txs', function (req, res) {
  var addr = req.query.a;
  var contractAddr = req.query.c;
  if (!EthJsUtil.isValidAddress(addr) || !EthJsUtil.isValidAddress(contractAddr)) {
    error.e = 'Invalid address.'
    return res.json(error);
  }

  req.app.blockchainApi.getERC20History(addr, contractAddr, (err, rs) => {

    if (err || !rs || rs.e) {
      error.e = 'Server error';
      return res.json(error);
    }
    res.json(rs);
  })
});

router.get('/addr/erc20/balance', function (req, res) {
  var addr = req.query.a;
  var contractAddr = req.query.c;
  if (!EthJsUtil.isValidAddress(addr) || !EthJsUtil.isValidAddress(contractAddr)) {
    error.e = 'Invalid address.'
    return res.json(error);
  }

  req.app.blockchainApi.getERC20Balance(addr, contractAddr, (err, rs) => {

    if (err || !rs || rs.e) {
      error.e = 'Server error'
      return res.json(error);
    }
    res.json(rs)
  })
});

router.get('/addr/txs', function (req, res) {
  var addr = req.query.a;
  if (!EthJsUtil.isValidAddress(addr)) {
    error.e = 'Invalid address.'
    return res.json(error);
  }

  req.app.blockchainApi.getAddressHistory(addr, (err, rs) => {

    if (err || !rs || rs.e) {
      error.e = 'Server error'
      return res.json(error);
    }
    res.json(rs)
  })
});

router.get('/addr/nonce', function (req, res) {
  var addr = req.query.a;
  if (!EthJsUtil.isValidAddress(addr)) {
    error.e = 'Invalid address.'
    return res.json(error);
  }

  req.app.blockchainApi.getAddressNonce(addr, (err, rs) => {
    if (err || !rs || rs.e) {
      error.e = 'Server error';
      return res.json(error);
    }
    res.json(rs)
  })
});
router.get('/addr/balance', function (req, res) {
  var addr = req.query.a;
  if (!EthJsUtil.isValidAddress(addr)) {
    error.e = 'Invalid address.'
    return res.json(error);
  }

  req.app.blockchainApi.getAddressBalance(addr, (err, rs) => {
    if (err || !rs || rs.e) {
      error.e = 'Server error';
      return res.json(error);
    }
    res.json(rs)
  })
});

module.exports = router;
