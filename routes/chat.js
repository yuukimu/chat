var express = require('express');
var router = express.Router();
var connection = require('../lib/dbfunc.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query({
    sql: 'SELECT * FROM `chatlog`',
    timeout: 40000, // 40s
  }, function (err, rows) {
    console.log(rows.length);
    res.render('chat', { title: 'Chat', rows: rows });
  });
});

module.exports = router;
