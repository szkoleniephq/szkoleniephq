var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send("BUM!");
});

app.listen(app.get('port'), function() {
  console.log("OK");
});