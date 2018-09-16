var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var favicon = require('serve-favicon')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var txRouter = require('./routes/tx');
var addrRouter = require('./routes/addr');
var blockRouter = require('./routes/block');
var searchRouter = require('./routes/search');
var apiRouter = require('./routes/api');

var BlockchainApi = require('./libs/blockchainApi');

var app = express();
var blockchainApi = new BlockchainApi('http://localhost:3000');
app.blockchainApi = blockchainApi;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({ credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tx', txRouter);
app.use('/addr', addrRouter);
app.use('/block', blockRouter);
app.use('/search', searchRouter);
app.use('/api', apiRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.Ready = function (cb) {
    blockchainApi.get10LatestBlock((err, blocks) =>{
        console.log(err);
        app.blocks = blocks;
        blockchainApi.getPendingTx(10, (err, txs)=>{
            app.txs = txs;
            cb()
        })
    })
}

module.exports = app;
