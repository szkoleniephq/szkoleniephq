var express = require('express');
var app = express();
//  mongodb://user:user@ds053139.mongolab.com:53139/db1

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send("BUM!");
});

app.listen(app.get('port'), function() {
  console.log("OK");
});