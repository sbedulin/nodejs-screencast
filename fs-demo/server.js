var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var ROOT = path.normalize(__dirname + '/public');

http.createServer(function (req, res) {
    if(!checkAccess(req)) {
        res.statusCode = 403;
        return res.end('Tell me the secret to access!');
    }

    sendFileSafe(url.parse(req.url).pathname, res)
}).listen(3000);

function checkAccess(req) {
    return url.parse(req.url, true).query.secret === 'o_O';
}

function sendFileSafe(filePath, res) {
    try {
        filePath = decodeURIComponent(filePath);
    } catch (e) {
        res.statusCode = 400;
        return res.end('Bad request');
    }

    console.log(filePath);

    if(~filePath.indexOf('\0')) {
        res.statusCode = 400;
        return res.end('Bad request');
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    console.log(ROOT);
    console.log(filePath);

    if(filePath.indexOf(ROOT) !== 0) {
        res.statusCode = 404;
        return res.end('File not found');
    }

    fs.stat(filePath, function (err, stats) {
        console.log(stats);

        if(err || !stats.isFile()) {
            res.statusCode = 404;
            return res.end('File not found');
        }

        sendFile(filePath, res);
    });
}

function sendFile(filePath, res) {
    fs.readFile(filePath, function (err, content) {
        if(err) throw err;

        var mime = require('mime').lookup(filePath);
        res.setHeader('Content-Type', mime + '; charset=utf-8');
        res.end(content);
    });
}
