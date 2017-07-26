var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT;

// Parse application/json
app.use(bodyParser.json());

app.use('/', require('./routes/todos'));

app.listen(port, function (err) {
  if (err) { throw err; }
  console.log('Listening on port ' + port);
});
