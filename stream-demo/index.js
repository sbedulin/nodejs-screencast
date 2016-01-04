var fs = require('fs');
var path = require('path');

// fs.ReadStream inherits from stream.Readable
var stream = new fs.ReadStream(
    path.normalize(__dirname + '/big.html')
);

stream.on('readable', function () {
    var data = stream.read();
    if(data) {
        console.log(data.length);
    }
});

stream.on('end', function () {
    console.log('THE END');
});

stream.on('error', function (err) {
    if(err.code === 'ENOENT') {
        console.log('File not found');
    } else {
        console.error(err);
    }
});
