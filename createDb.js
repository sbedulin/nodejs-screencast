var mongoose = require('libs/mongoose');
var User = require('models/user').User;
var async = require('async');

// 1. drop db
// 2. create & save 3 users
// 3. close connection

async.series([
    open,
    dropDatabase,
    createUsers,
    close
], function ( err, results ) {
    console.log(arguments);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function createUsers(callback) {
    var users = [
        { username: 'Vasya', password: 'supervasya' },
        { username: 'Petya', password: '123' },
        { username: 'admin', password: 'thetruehero' }
    ];

    async.each(users, function ( userData, callback ) {
        var user = new User(userData);
        user.save(callback);
    }, callback);
}

function close(callback) {
    mongoose.disconnect(callback);
}
