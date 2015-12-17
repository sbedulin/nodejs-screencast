var db = require('../db');

function User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    console.log(db.getPhrase('Hello') + ', ' + who.name);
};

module.exports = User;
// module.exports = exports = this
// exports = User; // this won't work, because "exports" is just a reference to module.exports
