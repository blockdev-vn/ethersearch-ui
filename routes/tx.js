var express = require('express');
var router = express.Router();

/* GET tx page. */
router.get('/', function(req, res, next) {
  res.render('tx', { title: 'tx' });
});

module.exports = router;
