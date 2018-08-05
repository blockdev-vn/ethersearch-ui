var express = require('express');
var router = express.Router();

/* GET tx page. */
router.get('/', function(req, res, next) {
  res.render('addr', { title: 'tx', info:{addr:'0x0dress', balance: '100.990', value:770, txs:100} });
});

module.exports = router;
