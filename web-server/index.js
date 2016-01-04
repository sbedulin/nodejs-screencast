var http = require('http');
var fs = require('fs');

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
}).listen(3000);
