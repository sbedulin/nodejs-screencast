var http = require('http');
var fs = require('fs');
var argv = require('yargs').argv;
var port = argv.port || 3000;

http.createServer(function (req, res) {
    var index = __dirname + '/index.html';

    if(req.url === '/async') {
        fs.readFile(index, function (err, info) {
            if(err) {
                console.error(err);
                res.statusCode = 500;
                return res.send('Server error');
            }

            res.end(info);
        });
    } else if (req.url === '/sync') {
        try {
            return res.end(
                fs.readFileSync(index)
            );
        } catch  (err) {
            console.error(err);
            res.statusCode = 500;
            return res.send('Server error');
        }

    } else if (req.url === '/') {
        res.end(new Date().toString());
    }
}).listen(port);
console.log('listening on port %s', port);
