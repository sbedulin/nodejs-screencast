var util = require('util');

var obj = {
    a: 5,
    b: 6,
    inspect: function () {
        return 123;
    }
};

console.log( util.inspect(obj) );
console.log( obj ); // same effect
