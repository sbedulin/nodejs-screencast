module.exports = function (server) {
    var io = require('socket.io')(server, /* options */ {});
    io.on('connection', function(socket) {
        socket.on('chat message', function (text, cb) {
            socket.broadcast.emit('chat message', text);
            cb();
        })
    });
};
