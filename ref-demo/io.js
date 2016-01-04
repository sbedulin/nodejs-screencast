var fs = require('fs');

fs.open(__filename, 'r', function (err, file) {
    console.log('I/O event');

    setImmediate(function () {
        console.log('immediate');
    });

    setTimeout(function () {
        console.log('timeout 0');
    }, 0);

    process.nextTick(function () {
        console.log('nextTick');
    });
});
