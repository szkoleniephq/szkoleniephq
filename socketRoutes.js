module.exports = function(io, db, events) {

	io.on('connection', function(socket) {
		console.log('client connected')

		db.getCandidates().then(function(candidates) {
			console.log('result-sync', candidates);
			socket.emit('result-sync', candidates);
		})
	});

	events.on('candidatesLoaded', function() {

		db.getCandidates().then(function(candidates) {
			console.log('result-sync', candidates);
			io.sockets.emit('result-sync', candidates);
		})
	});

	events.on('result-sync', function() {
		db.getCandidates().then(function(candidates) {
			console.log('result-sync', candidates);
			io.sockets.emit('result-sync', candidates);
		})
	})
};