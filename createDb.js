var mongoose = require('libs/mongoose');
var async = require('async');

// 1. drop db
// 2. create & save 3 users
// 3. close connection

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function ( err, results ) {
    mongoose.disconnect();
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models/user').User.on('index', callback);
}

function createUsers(callback) {
    var users = [
        { username: 'Vasya', password: 'supervasya' },
        { username: 'Petya', password: '123' },
        { username: 'admin', password: 'thetruehero' }
    ];

    async.each(users, function ( userData, callback ) {
        console.log('saving user');

        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}
