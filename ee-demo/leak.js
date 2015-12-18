var EventEmitter = require('events').EventEmitter;
var db = new EventEmitter;
db.setMaxListeners(0); // use with caution! don't forget to free up memory

function Request() {
    var self = this;

    this.bigData = new Array(1e6).join('*');

    this.send = function (data) {
        console.log(data);
    };

    function onData(info) {
        self.send(info);
    }

    this.end = function () {
        db.removeListener('data', onData);
    };

    db.on('data', onData);
}

setInterval(function () {
    var request = new Request();
    // ...
    request.end();

    console.log(process.memoryUsage().heapUsed);
    //console.log(db);
}, 200);
