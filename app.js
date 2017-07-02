var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http'); 

var index = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');

var app = express();
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// add
var server = http.createServer(app).listen(app.get('port'),function()
{
  console.log("Node.js Server Start. port:" + app.get('port'));
}); 
 
 var connection = require('./lib/dbfunc.js');
// ----socket.io add begin----
// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
var io = require('socket.io').listen(server);
 
io.sockets.on('connection', function(socket) 
{
  console.log("connection");
  console.log(io.clients().server.eio.clientsCount + "Clients");
  
  socket.on('message', function(data) 
  {
    console.log("massage");
    console.log(JSON.parse(data.value)['user']);
    var json = JSON.parse(data.value)
    // クライアント全員に送信
    var query = "insert into chatlog (author, message) values (?, ?)";
    connection.query({
      sql: query,
      timeout: 40000, // 40s
      values: [json['user'], json['msg']]
    }, function (err, rows) {
    });
    io.emit('message', { value: JSON.stringify(json) });
  });
   
  socket.on('disconnect', function()
  {
    console.log("disconnect");
  });
});
