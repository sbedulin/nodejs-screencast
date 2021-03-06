var config = require('config');
var path = require('path');
var HttpError = require('error').HttpError;
var errorhandler = require('errorhandler');
var favicon = require('serve-favicon');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var isDevelopment = app.get('env') === 'development';

// logging setup
var logger = require('libs/log')(module);
// optionally combine loggers
app.use(require('morgan')('combined', { stream: logger.stream }));

// view engine setup
app.engine('ejs', require('ejs-mate'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// session setup
var session = require('express-session');
var sessionStore = require('libs/sessionStore');
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));

// routes
require('routes')(app);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new HttpError(404, 'Page Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    if (typeof err == 'number') { // next(404);
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') === 'development') {
            errorhandler()(err, req, res, next);
        } else {
            logger.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

module.exports = app;
