/*
 * Simulates case where 50 requests are fired under a second to check application's
 * capacity. 
 * This example utilize Mocha task configured in Grunt. See the result after
 * a Grunt run.
 */

var loadtest = require('loadtest');
var expect = require('chai').expect;

suite('Stress tests', function(){

      test('Homepage should handle 50 requests in under a second', function(done){
          var options = {
              url: 'http://localhost:3000',
              concurrency: 4,
              maxRequests: 50,
          };
          loadtest.loadTest(options, function(err,result){
            // expect no errors, and toal response time under 1 second
            expect(!err);
            expect(result.totalTimeSeconds < 1);
            done();
          });
      });

});
