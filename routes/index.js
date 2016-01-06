var express = require('express');
var router = express.Router();

router.get('/', require('./frontpage').get);

router.get('/chat', require('./chat').get);

module.exports = router;
