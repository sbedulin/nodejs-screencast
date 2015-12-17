var User = require('./user');

var vasya = new User('Vasya');
var petya = new User('Petya');

vasya.hello(petya);
