var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/chat';

MongoClient.connect(url, function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');

    collection.remove({}, function ( err, affected ) {
        collection.insert({ a: 2 }, function ( err, docs ) {
            collection.count( function ( err, count ) {
                console.log('count = %s', count);
            })

            var cursor = collection.find({ a: 2 });
            cursor.toArray( function ( err, results ) {
                console.dir(results);
                db.close();
            })
        });
    });
});
