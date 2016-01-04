var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
    // res instanceof http.ServerResponse < stream.Writable

    var htmlFile = path.normalize(__dirname + '/big.html');

    if(req.url === '/big.html') {
        fs.readFile(htmlFile, function (err, content) {
            if(err) {
                res.statusCode = 500;
                return res.end('Server Error');
            }

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(content);
        });
    }
}).listen(3000);
