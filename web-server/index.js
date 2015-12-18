var http = require('http');
var debug = require('debug')('server');

var server = new http.Server();
server.on('request', require('./request'));

server.listen(1337, '127.0.0.1');
debug('Server is running');
