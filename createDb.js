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
    async.parallel([
        function (cb) {
            var vasya = new User({ username: 'Vasya', password: 'supervasya' });
            vasya.save(function ( err ) {
                cb(err, vasya);
            });
        },
        function (cb) {
            var petya = new User({ username: 'Petya', password: '123' });
            petya.save(function ( err ) {
                cb(err, petya);
            });
        },
        function (cb) {
            var admin = new User({ username: 'admin', password: 'thetruehero' });
            admin.save(function ( err ) {
                cb(err, admin);
            });
        }
    ], callback);
}

function close(callback) {
    mongoose.disconnect(callback);
}
