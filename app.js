var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const log = require('./log');
const axios = require('axios');
var fs = require('fs');
const {uiAuthentication} = require('./authentication');

const AUTHENTICATION_TOKEN = process.env.AUTHENTICATION_TOKEN;
axios.defaults.headers.common['Authorization'] = AUTHENTICATION_TOKEN;

var indexRouter = require('./routes/index');
var initRouter = require('./routes/init');
var reconnectRouter = require('./routes/reconnect');
var triggerRouter = require('./routes/trigger');
var tradeRouter = require('./routes/trade');
var portfolioRouter = require('./routes/portfolio');
var configRouter = require('./routes/config');
var statusRouter = require('./routes/status');
var adviceRouter = require('./routes/advice');
var pairControlRouter = require('./routes/pair_control');
var stopGekkoRouter = require('./routes/stopGekko');
var startGekkoRouter = require('./routes/startGekko');
var runGekkoRouter = require('./routes/runGekko');
var loginRouter = require('./routes/login');
var backtestRouter = require('./routes/backtest');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs/requests.log'), { flags: 'a' })
}));

// allow cross access
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH, *");
  res.setHeader('Access-Control-Allow-Headers', "Authorization, content-type, *")
  next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter)
// Authentication
app.use((req, res, next) => {
  let token = req.header("Authorization");
  if (token !== AUTHENTICATION_TOKEN && req.method.toLowerCase() !== 'options') {
    // Ở đây có thể là user
    let result = uiAuthentication(token);
    if(result.isValid) {
      next();
    } else {
      log.warn("Receved a invalid request");
      res.status(403).send({error: result.errorMessage});
      return;
    }
  } else {
    next();
  }
})

app.use('/', indexRouter);
app.use('/init', initRouter);
app.use('/reconnect', reconnectRouter);
app.use('/trigger', triggerRouter);
app.use('/trade', tradeRouter);
app.use('/portfolio', portfolioRouter);
app.use('/config', configRouter);
app.use('/advice', adviceRouter);
app.use('/status', statusRouter);
app.use('/pair-control', pairControlRouter);
app.use('/stop-gekko', stopGekkoRouter);
app.use('/start-gekko', startGekkoRouter);
app.use('/run-gekko', runGekkoRouter);
app.use('/backtest', backtestRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
