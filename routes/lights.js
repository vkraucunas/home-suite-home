var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/on', function(req, res, next) {
  res.send({});
});

router.get('/off', function(req, res, next) {
    res.send({});
}

module.exports = router;
