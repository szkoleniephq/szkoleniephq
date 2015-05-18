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
				name: true,
				result: true,
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
		var defered_all = q.defer();
		var promises = [];		
		db_promise.promise.then(function(db) {
			for (var _idx = 0; _idx < votes.length; _idx++) {
				var vote = votes[_idx];
				console.log("Vote: ", vote);
				db.collection('constituencies').find({
					_id: ObjectID(vote.constituencyId)
				}).count((function(){
					var vote = votes[_idx];
					var defered = q.defer();
					promises.push(defered);
					return function(err, count) {
					console.log("Count: ", _idx, count);
					console.log("Vote: ", vote);
					if (err || !count) {
						defered.resolve();
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
					defered.resolve();
				}})());
			}
		});
		q.all(promises).done(function(){
			defered_all.resolve();
		});		
		return defered_all.promise;
	},

	getDb: function() {
		return db_promise.promise;
	}
};