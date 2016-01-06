var express = require('express');
var router = express.Router();
var User = require('models').User;

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username }, function (err, user) {
        if(err) return next(err);

        if(user) {
            if(user.checkPassword(password)) {
                // 200 OK
            } else {
                // 403 Forbidden
            }
        } else {
            var user = new User({ username: username, password: password });
            user.save(function (err) {
                if(err) return next(err);
                // 200 OK
            });
        }
    });
});

module.exports = router;
