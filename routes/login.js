var express = require('express');
var router = express.Router();

var user = require('models/user');
var User = user.User;
var AuthError = user.AuthError;
var HttpError = require('error').HttpError;

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function (err, user) {
        if(err) {
            if(err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            }
            return next(err)
        };

        req.session.user = user._id;
        res.send({});
    });
});

module.exports = router;
