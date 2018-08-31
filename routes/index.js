var express = require('express');
var router = express.Router();
var Common = require('../libs/common')
/* GET home page. */
router.get('/', function(req, res, next) {
  var blocks = req.app.blocks || [];
  var txs = req.app.txs || [];
  var serverIP = req.app.serverIP;
  var attachData = {
    title: "Home",
    blocks: blocks,
    txs: txs,
    SERVER_IP: serverIP
  }
  attachData['Common'] = Common;
  console.log('SERVER_IP ', serverIP);
  res.render('index', attachData);
});

module.exports = router;
