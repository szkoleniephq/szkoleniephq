module.exports = function(app, db, events) {

	app.get('/', function(request, response) {
		response.sendFile(__dirname + '/index.html');
	});

	app.get('/constituencies', function(request, response) {
		db.getConstituencies().then(function(constituencies) {
			response.json(constituencies);
		})
	});

	app.get('/candidates', function(request, response) {
		db.getCandidates().then(function(candidates) {
			response.json(candidates);
		})

		events.emit('candidatesLoaded');
	});

	app.post('/saveResult', function(request, response) {
		var votingResult = request.params.votingResult;
		db.storeVotes(votingResult).then(function(result) {
			response.write("ok");

			//notify all clients about new vote
			events.emit('result-sync');
		});
	});

};