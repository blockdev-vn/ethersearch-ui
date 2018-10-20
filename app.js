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


class App {
    constructor(serverIP, blockchainApi) {
        var app = express();
        app.blockchainApi = blockchainApi;
        app['serverIP'] = serverIP;

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
        this.app = app;
    }
    getApp() {
        return this.app
    }
}

module.exports = App;
