var express = require('express');
var router = express.Router();
var Common = require('../libs/common')
/* GET home page. */
router.get('/', function (req, res, next) {
  // var blocks = req.app.blocks || [];
  // var txs = req.app.txs || [];
  var serverIP = req.app.serverIP;
  req.app.blockchainApi.get10LatestBlock((err, blocks) => {
    if (err) {
      console.log("Can not get latest blocks");
    }
    
    req.app.blockchainApi.getPendingTx(10, (err, txs) => {
      var attachData = {
        title: "Home",
        blocks: blocks || [],
        txs: txs || [],
        SERVER_IP: serverIP
      }
      attachData['Common'] = Common;
      res.render('index', attachData);
    })
  })
});

module.exports = router;
