module.exports = function(io, db, events) {


	io.on('connection', function(socket) {
		console.log('client connected')
	});


	events.on('newVote', function() {
		io.emit('votes', "sample vote");
	})
};