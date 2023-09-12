var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Demonne Finance Records System' });
  res.sendFile(path.join(__dirname, '../public', 'pages', 'login.html'))
});

module.exports = router;
