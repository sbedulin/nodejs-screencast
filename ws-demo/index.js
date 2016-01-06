var WebSocketServer = require('ws').Server;
var http = require('http');
var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
server.listen(8080);

var webSocketServer = new WebSocketServer({ server: server });
webSocketServer.on('connection', function (ws) {
    var timer = setInterval(function () {
        ws.send(JSON.stringify(process.memoryUsage()), function (err) {
            // handle errs
        });
    }, 100);

    console.log('client connected');

    ws.on('close', function () {
        console.log('client disconnected');
        clearInterval(timer);
    });
});
