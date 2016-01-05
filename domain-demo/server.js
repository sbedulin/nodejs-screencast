var http = require('http');
var fs = require('fs');
var path = require('path');
var pathToIndexHtml = path.normalize(__dirname + '/index.html');

function handler(req, res) {
    if(req.url === '/') {
        fs.readFile(pathToIndexHtml + 'nofile', function (err, data) {
            if(err) throw err;

            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}

var server = http.createServer(handler);
module.exports = server;
