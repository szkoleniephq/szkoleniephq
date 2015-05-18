var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    q = require('q'),
    db = null,
    db_promise = q.defer();

if (!db) {
    MongoClient.connect('mongodb://user:user@ds053139.mongolab.com:53139/db1', function(err, _db) {
        if (err) {
            db_promise.reject();
            return;
        }
        db = _db;
        db_promise.resolve(db);
    });
} else {
    db_promise.resolve(db);
}

module.exports = {
    getConstituencies: function() {
        var defered = q.defer();
        db_promise.promise.then(function(db) {
            db.collection('constituencies').find({}).toArray(function(err, data) {
                if (err) {
                    defered.reject();
                    return;
                }
                defered.resolve(data);
            });
        });
        return defered.promise;
    },
    get: function() {
        return db;
    }
};
