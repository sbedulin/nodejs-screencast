var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var info;

    if(req.url === '/') {
        info = fs.readFileSync(__dirname + '/index.html');
        res.end(info);
    } else if (req.url === '/now') {
        res.end(new Date().toString());
    }
}).listen(3000);
