var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
    // res instanceof http.ServerResponse < stream.Writable

    var htmlFile = path.normalize(__dirname + '/big.html');

    if(req.url === '/big.html') {
        var file = new fs.ReadStream(htmlFile);
        sendFile(file, res);
    }
}).listen(3000);

function sendFile(file, res) {
    file.pipe(res);

    // we can pipe to different writables
    //file.pipe(process.stdout);

    file.on('error', function (err) {
        res.statusCode = 500;
        res.end('Server Error');
        console.error(err);
    });

    file.on('open', function () {
            console.log('open');
        })
        .on('close', function () {
            console.log('close');
        });

    res.on('close', function () {
        file.destroy();
    });
}
