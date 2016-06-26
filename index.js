'use strict';
var express = require('express');
var expressCsv = require('express-csv-middleware');
var app = express();

app.get('/', function (req, res) {
  res.send('TBD');
});
 
var bodyParserOptions = {
  // https://github.com/expressjs/body-parser#bodyparsertextoptions 
};
var csvOptions = {
  // http://csv.adaltas.com/parse/ 
  // http://csv.adaltas.com/stringify/ 
};
 
app.use(expressCsv(bodyParserOptions, csvOptions));
 
// POST with Content-Type: text/csv 
app.post(function(req, res) {
  console.log(req.body);    // [['header', 'row'], ['body', 'rows'], ...] 
  app.csv(req.body);        // Respond with Content-Type: text/csv 
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});

