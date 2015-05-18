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
            console.log('error', err);
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
                    console.log('error', err);
                    defered.reject();
                    return;
                }
                defered.resolve(data);
            });
        });
        return defered.promise;
    },
    getCandidates: function() {
        var defered = q.defer();
        db_promise.promise.then(function(db) {
            db.collection('candidates').find({}, {
                //name: true
            }).toArray(function(err, data) {
                if (err) {
                    console.log('error', err);
                    defered.reject();
                    return;
                }
                defered.resolve(data);
            });
        });
        return defered.promise;
    },

    storeVotes: function(votes) {
        db_promise.promise.then(function(db) {
            for (var idx = 0; idx < votes.length; idx++) {
                var vote = votes[idx];
                db.collection('constituencies').find({
                    _id: ObjectID(vote.constituencyId)
                }).count(function(err, count) {
                    if (err || !count) {
                        return;
                    }
                    db.collection('candidates').update({
                        _id: ObjectID(vote.candidateId)
                    }, {
                        $push: {
                            votes: {
                                constituencyId: vote.constituencyId,
                                votes: vote.votes
                            }
                        },
                        $inc: {
                            result: vote.votes
                        }
                    });
                });
            }
        });
    },

    getDb: function() {
        return db_promise;
    }
};
