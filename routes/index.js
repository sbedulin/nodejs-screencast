module.exports = function (app) {
    app.use('/', require('./frontpage'));
    app.use('/users', require('./users'));
    app.use('/chat', require('./chat'));
    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));
};
