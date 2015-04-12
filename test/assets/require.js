var fixture = require('../fixtures/test.json');

exports.handler = function(event, context) {
  return fixture.Records[0].test;
};