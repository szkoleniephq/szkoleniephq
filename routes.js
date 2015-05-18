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

		var votingResult = request.body;
		// console.log(votingResult);
		// response.json(votingResult);
		console.log('SAVE RES', votingResult);

		db.storeVotes(votingResult).then(function(result) {
			response.json(votingResult);
			console.log('ook');
			//notify all clients about new vote
			setTimeout(function() {
				events.emit('result-sync');
			}, 1000)

		});
	});

};