var phrases;
exports.connect = function () {
    phrases = require('./de');
};

exports.getPhrase = function (name) {
    if(!phrases[name]) {
        throw new Error('There\'s no such phrase: ' + name);
    }
    return phrases[name];
};
