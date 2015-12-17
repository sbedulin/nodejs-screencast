var util = require('util');

var str = util.format('My %s %d %j', 'string', 123, { test: 'obj' });
console.log(str);

// or directly
console.log('My %s %d %j', 'string', 123, { test: 'obj' });
