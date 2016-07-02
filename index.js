'use strict';
var express = require('express');
var fs = require('fs');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var inputSource = 'Violations-2012.csv';
var app = express();
var records;

app.set('view engine', 'pug');

// Convert the CSV to a JSON object
var getinput = function() {
  converter.on('end_parsed', function(jsonArray) {
    records = jsonArray;
  });
  fs.createReadStream(inputSource).pipe(converter);
};

// extract Category data
var getCategories = function(input) {
  var categories = [];
  input.forEach(function(item) {
    if (item.hasOwnProperty('violation_category')) {
      categories.push(item['violation_category']);
    }
  });
  return categories;
};

// sum up violations per category
var getNumberOfViolations = function(input) {
  var violations = {};
  input.forEach(function(violation) {
    violations[violation] = violations[violation] + 1 || 1;
  });
  console.dir(violations);
  return violations;
};


// get the earliest date per category
var getEarliestViolation = function (input) {
};

// get the most recent date per category
var getMostRecentViolation = function (input) {
};

// ExpressJS routes
app.get('/', function (req, res) {

  var categories = getCategories(records);
  var violations = getNumberOfViolations(categories);
  res.render('index', { title: 'Building Code Violations',
                        message: 'Building Code Violations',
                        violations: violations,
                        earliest: 'tbd',
                        latest:   'tbd' 
                      });
});

// start server on localhost
var server = app.listen(3000, function () {
  console.log('Listening on port 3000');
  getinput();
});

module.exports = app;
