var http = require('http');

var server = new http.Server(); // http.Server -> net.Server -> EventEmitter

server.listen(1337, '127.0.0.1');

var counter = 0;
server.on('request', function (req, res) {
    res.end('Hello World! ' + ++counter);
});

//console.log('server events: ', Object.keys(server._events).join(' | '));

var emit = server.emit;
server.emit = function (event) {
    console.log('event fired: ', event);
    emit.apply(server, arguments);
};
