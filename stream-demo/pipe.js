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
    file.on('readable', write);
    file.on('end', function () {
        res.end();
    });

    function write() {
        var fileContent = file.read();

        console.log('------ write -------');
        console.log((fileContent || {}).length);

        if(fileContent && !res.write(fileContent)) {
            file.removeListener('readable', write);
            res.once('drain', function () {
                file.on('readable', write);
                write();
            });
        }
    }
}
