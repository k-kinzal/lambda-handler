var fixture = require('../fixtures/test.json');

exports.handler = function(event, context) {
  console.log(fixture);
  return fixture.Records[0].test;
};