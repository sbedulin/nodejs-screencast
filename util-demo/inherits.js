var util = require('util');

function Animal(name) {
    this.name = name;
}

Animal.prototype.walk = function () {
    console.log('Walks ' + this.name);
};

function Rabbit(name) {
    this.name = name;
}

util.inherits(Rabbit, Animal);

Rabbit.prototype.jump = function () {
    console.log('Jumps ' + this.name);
};

var rabbit = new Rabbit('Bunny');
rabbit.walk();
rabbit.jump();
