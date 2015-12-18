var url = require('url');
var log = require('./log')(module);

module.exports = function (req, res) {
    log.info('Got request', req.method, req.url );

    var urlParsed = url.parse(req.url, true);

    if(urlParsed.pathname === '/echo' && urlParsed.query.message) {
        var message = urlParsed.query.message;
        log.debug('Echo: ' + message);

        res.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
        res.end( message );
    } else {
        log.error('Unknown URL');
        res.statusCode = 404;
        res.end('Page Not Found');
    }
};
