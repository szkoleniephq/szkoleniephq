var express = require('express');
var app = express();

var api = require('./api');
//  mongodb://user:user@ds053139.mongolab.com:53139/db1

var MongoClient = require('mongodb').MongoClient;

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
	response.send("BUM tsss!");
});

app.get('/constituencies', function(request, response) {
	api.loadConstituencies(function(constituencies) {
		response.json(constituencies);
	})
});

app.get('/candidates', function(request, response) {
	var constituencyId = request.params.constituencyId;
	api.loadCcandidates(constituencyId, function(candidates) {
		response.json(candidates);
	})
});

app.post('/saveResult', function(request, response) {
	var constituencyId = request.params.constituencyId;
	var constituenceResult = request.params.constituenceResult;
	api.saveConstituenceResult(constituencyId, constituenceResult, function(result) {
		response.json(result);
	});
});

app.listen(app.get('port'), function() {
	console.log("OK");
});

// Connect to the db
MongoClient.connect("mongodb://user:user@ds053139.mongolab.com:53139/db1", function(err, db) {
	if (err) {
		return console.dir(err);
	}
	console.log('hura');
});