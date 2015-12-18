var url = require('url');
var debug = require('debug')('server:request');

module.exports = function (req, res) {
    debug('Got request', req.method, req.url );

    var urlParsed = url.parse(req.url, true);

    if(urlParsed.pathname === '/echo' && urlParsed.query.message) {
        var message = urlParsed.query.message;
        debug('Echo: ' + message);

        res.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
        res.end( message );
    } else {
        debug('Unknown URL');
        res.statusCode = 404;
        res.end('Page Not Found');
    }
};
