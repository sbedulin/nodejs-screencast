var util = require('util');
var PhraseError = require('./PhraseError');
var HttpError = require('./HttpError');

var phrases = {
    "Hello": "Hallo",
    "world": "welt"
};

function getPhrase(name) {
    if(!phrases[name]) {
        throw new PhraseError('No such phrase: ' + name);
    }
    return phrases[name];
}

function makePage(url) {
    if(url != 'index.html') {
        throw new HttpError(404, 'No such page');
    }
    return util.format(
        '%s, %s!',
        getPhrase(process.argv[3] || 'Hello'),
        getPhrase(process.argv[4] || 'world')
    );
}

try {
    var url = process.argv[2] || 'index.html';
    var page = makePage(url);
    console.log(page);
} catch(e) {
    if(e instanceof HttpError) {
        console.log(e.status, e.message);
    } else {
        console.log('Error %s\n message: %s\n stack: %s', e.name, e.message, e.stack);
    }
}
