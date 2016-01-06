var User = require('models/user').User;
var HttpError = require('error').HttpError;
var ObjectID = require('mongodb').ObjectID;

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);

        res.json(users);
    });
});

router.get('/:id', function (req, res, next) {
    function userNotFound () {
        return next(new HttpError(404, 'User Not Found'));
    }

    try {
        var id = new ObjectID(req.params.id);
    } catch (e) {
        return userNotFound();
    }

    User.findById(id, function (err, user) {
        if (err) return next(err);

        if (!user) {
            return userNotFound();
        }

        res.json(user);
    });
});

module.exports = router;
