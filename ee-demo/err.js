var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter;

server.on('error', function (err) {
    console.log('server caught error | %s', err.message);
});

server.emit('error', new Error('server error'));
