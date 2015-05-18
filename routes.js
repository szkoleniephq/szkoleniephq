module.exports = function(app, db, events) {




	app.get('/', function(request, response) {
		response.res.sendFile(__dirname + '/index.html');
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
	});

	app.post('/saveResult', function(request, response) {
		var candidateResult = request.params.candidateResult;
		db.saveConstituenceResult(constituencyId, constituenceResult).then(function(result) {
			response.json(result);
		});

		//notify all clients about new vote
		events.emit('newVote');
	});

};