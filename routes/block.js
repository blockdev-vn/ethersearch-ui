var express = require('express');
var router = express.Router();
var Common = require('../libs/common');
/* GET tx page. */
router.get('/', function (req, res, next) {
  var number = parseInt(req.query.number, 10);
  if (isNaN(number)) {
    return res.redirect('./error');
  }
  req.app.blockchainApi.getBlockByNumer(number, (err, rs) => {
    console.log('GEt err');
    console.log(err);
    console.log(rs.data);
    if (err || !rs || rs.e) {
      return res.redirect('./error');
    }

    var attachData = {
      title: 'block ' + number,
    }
    attachData = Object.assign(attachData, rs.data)
    attachData['Common'] = Common;

    res.render('block', attachData);
  })
});

module.exports = router;
