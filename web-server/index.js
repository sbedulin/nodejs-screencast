var http = require('http');
var log = require('./log')(module);

var server = new http.Server();
server.on('request', require('./request'));

server.listen(1337, '127.0.0.1');
log.info('Server is running');
