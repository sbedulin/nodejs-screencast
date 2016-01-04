var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    if(req.url === '/') {
        fs.readFile(__dirname + '/index.html', function (err, info) {
            res.end(info);
        });
    } else if (req.url === '/now') {
        res.end(new Date().toString());
    }
}).listen(3000);
