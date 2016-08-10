var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var kafka = require('kafka-node');
// var kafkaConsumer = kafka.Consumer();

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /client
//app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'client')));


// kafka stuff
var client = new kafka.Client('localhost:9092');
// var consumer = new kafka.Consumer(
//         client,
//         [
//             { topic: 'test', partition: 0 },
//             { topic: 'test', partition: 1 }
//         ],
//         {
//             // autoCommit: false
//         }
//     );
//
// consumer.on('message', function(message) {
//     console.log('New kafka message: ' + message);
// });
//
// consumer.on('error', function(err) {
//     console.log('Kafka Error! ' + err);
// });
//
// consumer.on('offsetOutOfRange', function (err) {
//     console.log("Error!: " + err);
// });
//
// consumer.addTopics(['test']);

var client = new kafka.Client();
var consumer = new kafka.HighLevelConsumer(
    client,
    [
        { topic: 'test' }
    ],
    {
        groupId: 'my-group'
    }
);
consumer.on('message', function(message) {
    console.log('New kafka message: ' + JSON.stringify(message,null,2));
});

consumer.on('error', function(err) {
    console.log('Kafka Error! ' + err);
});

// website stuff
app.all('/*', function(req, res) {
  res.sendfile('client/index.html');
});

// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
