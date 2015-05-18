var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./database');
var EventEmitter = require("events").EventEmitter;

app.use('/webapp', express.static(__dirname + '/webapp'));
app.use('/mobile', express.static(__dirname + '/mobile'));
app.use('/lib', express.static(__dirname + '/lib'));

var MongoClient = require('mongodb').MongoClient;
app.set('port', (process.env.PORT || 5000));

var ee = new EventEmitter();

var socketRoutes = require('./socketRoutes')(io, db, ee);
var routes = require('./routes')(app, db, ee);


server.listen(app.get('port'), function() {
	console.log("OK");
});