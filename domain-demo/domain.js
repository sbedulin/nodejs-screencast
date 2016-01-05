var domain = require('domain');
var fs = require('fs'), http = require('http');

var d = domain.create(), server;

d.on('error', function (err) {
    console.error('Domain caught %s', err);
});

d.run(function () {
    console.log('d.run');
    // d.enter(); -> process.domain

    server = new http.Server();
    console.log('server.domain = ', server.domain);

    // d.exit();
});

console.log('after d.run');

server.on('boom', function () {
    setTimeout(function () {
        fs.readFile(__filename, function () {
            ERROR();
        });
    }, 1000);
});

server.emit('boom');
