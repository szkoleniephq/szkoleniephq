module.exports = function(app) {

	var db = require('./db');


	app.get('/', function(request, response) {
		response.send("BUM tsss!");
	});

	app.get('/constituencies', function(request, response) {
		db.loadConstituencies().then(function(constituencies) {
			response.json(constituencies);
		})
	});

	app.get('/candidates', function(request, response) {
		var constituencyId = request.params.constituencyId;
		db.loadCcandidates(constituencyId).then(function(candidates) {
			response.json(candidates);
		})
	});

	app.post('/saveResult', function(request, response) {
		var constituencyId = request.params.constituencyId;
		var constituenceResult = request.params.constituenceResult;
		db.saveConstituenceResult().then(function(result) {
			response.json(result);
		});
	});

};