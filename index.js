var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
app.set('port', (process.env.PORT || 5000));


var routes = require('./routes')(app);

app.listen(app.get('port'), function() {
	console.log("OK");
});