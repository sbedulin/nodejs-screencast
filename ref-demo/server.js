var http = require('http');
http.createServer(function (req, res) {
    console.log('----------- request handler -----------');

    // happens in the nearest time, but unclear when
    setTimeout(function () {
        console.log('setTimeout 0');
    }, 0);

    // happens after this func but before everything else
    process.nextTick(function () {
        console.log('next tick');

        req.on('readable', function () {
            console.log('readable');
        });
    });

    res.end('hey');
}).listen(1337);
