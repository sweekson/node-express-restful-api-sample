var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Parse application/json
app.use(bodyParser.json());

app.use('/', require('./routes/todos'));

app.listen(port, function (err) {
  if (err) { throw err; }
  console.log('Listening on port ' + port);
});
