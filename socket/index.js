var log = require('libs/log')(module);
var config = require('config');
var connect = require('connect');
var async = require('async');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var sessionStore = require('libs/sessionStore');
var HttpError = require('error').HttpError;
var User = require('models/user').User;

function loadSession(sid, callback) {
    // callback(null, session)
    // callback(null, null)
    // callback(err)

    sessionStore.load(sid, function (err, session) {
        if(arguments.length === 0) {
            return callback(null, null);
        } else {
            return callback(null, session);
        }
    });
}

function loadUser(session, callback) {
    if(!session.user) {
        log.debug('Session %s is anonymous', session.id);
        return callback(null, null);
    }

    log.debug('retrieving user', session.user);

    User.findById(session.user, function(err, user) {
        if(err) return callback(err);

        if(!user) {
            return callback(null, null);
        }

        log.debug('User.findById result', user.get('username'));

        callback(null, user);
    });
}

module.exports = function (server) {
    var io = require('socket.io')(server);

    io.use(function(socket, next) {
        // make sure the handshake data looks good as before
        // if error do this:
        // next(new Error('not authorized');
        // else just call next

        async.waterfall([
            function (callback) {
                var cookies = cookie.parse(socket.request.headers.cookie || '');
                var sidCookie = cookies[config.get('session:key')];
                var sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));

                loadSession(sid, callback);
            },
            function (session, callback) {
                if(!session) {
                    return callback(new HttpError(401, 'No session'));
                }

                socket.request.session = session;
                loadUser(session, callback);
            },
            function (user, callback) {
                if(!user) {
                    return callback(403, 'Anonymous session may not connect');
                }

                socket.request.user = user;
                callback(null);
            }
        ], function (err) {
            if(!err) {
                return next(null, true);
            }

            if(err instanceof HttpError) {
                return next(null, false);
            }

            next(err);
        });
    });

    io.on('connection', function(socket) {
        // HTTP(S)
        // browser -> login password -> server
        // browser <- sid (cookie)   <- server
        // browser --sid--> server

        // HTTP(S)
        // browser --sid--> WSKEY -> server { sid: sid, wskey: wskey, ttl: 60s }

        // WS(S)
        // document.cookie with session.cookie.httpOnly set to false (not really secure)
        // we'll use temporary WSKEY

        var username = socket.request.user.get('username');
        socket.broadcast.emit('chat join', username);

        socket.on('chat message', function (text, callback) {
            socket.broadcast.emit('chat message', username, text);
            callback && callback();
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('chat leave', username);
        });
    });

    io.disconnectSession = function (sid) {
        var allSockets = io.sockets.sockets;
        for(var socketId in allSockets) {
            var socket = allSockets[socketId];
            if(socket && socket.request && socket.request.session.id === sid) {
                socket.emit('logout');
                socket.onclose();
            }
        }
    };

    return io;
};
