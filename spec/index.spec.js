'use strict';
var request = require('request');
var app = require('../index');
var baseUrl = 'http://localhost:3000/';

describe('app', function() {
  describe('GET /', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
