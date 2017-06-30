var mysql = require('mysql');

var dbConfig = {
  host: '127.0.0.1',
  user: 'cent',
  password: 'cent',
  port : 13306,
  database: 'chat'
}

var connection = mysql.createConnection(dbConfig);
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });
module.exports = connection;