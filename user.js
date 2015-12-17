function User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    console.log('Hello, ' + who.name);
};

global.User = User;
