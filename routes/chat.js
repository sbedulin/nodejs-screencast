var express = require('express');
var router = express.Router();

router.get('/', require('middleware/checkAuth'), function (req, res) {
    res.render('chat');
});

module.exports = router;
