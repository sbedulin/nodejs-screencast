//var mongo = require('mongodb');
//var mysql = require('mysql');
var redis = require('redis').createClient();

function handler(req, res) {
    if(req.url === '/') {
        redis.get('data', function (err, data) {
            // ...
            throw new Error('redis callback');
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}

module.exports = handler;
