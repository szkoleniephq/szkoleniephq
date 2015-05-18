module.exports = function(io, db, events) {

	var getVotes = function(callback) {
		db.getCandidates().then(function(candidates) {
			candidates.forEach
		})
	}

	io.on('connection', function(socket) {
		console.log('client connected')
	});

	events.on('candidatesLoaded', function() {

		db.getCandidates().then(function(candidates) {
			console.log('result-sync', candidates);
			io.sockets.emit('result-sync', candidates);
		})
	});

	events.on('newVote', function() {
		db.getCandidates().then(function(candidates) {
			console.log('result-sync', candidates);
			io.sockets.emit('result-sync', candidates);
		})
	})
};