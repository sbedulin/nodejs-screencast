var db = require('db');
var log = require('logger')(module);

function User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    log(db.getPhrase('Hello') + ', ' + who.name);
};

module.exports = User;
// module.exports = exports = this
// exports = User; // this won't work, because "exports" is just a reference to module.exports
