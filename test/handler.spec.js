'use strict';
// require
var assert  = require('power-assert');
var factory = require('../src/handler');
// test
describe('Lambda handler factory:', function() {
	it('should create lambda handler', function() {
		var handler = factory('../test/assets/index');
		assert.ok(typeof(handler) === 'function');
	});

	it('sholuld execute lambda handler', function() {
		var handler = factory('../test/assets/index');
		assert.ok(handler());
	});

  it('should execute lambda handler by callback style', function(done) {
    var callback = factory('../test/assets/index', function(handler, event, context) {
      assert.ok(handler(event, context));
      assert.deepEqual(event, {Records: []});
      assert.ok(typeof(context.done) === 'function');
      done();
    });

    callback();
  });

  it('should get fixture as event param by callback style', function(done) {
    var callback = factory('../test/assets/index', '../test/fixtures/test.json', function(handler, event, context) {
      assert.ok(event.Records[0].test === 1);
      done();
    });

    callback();
  });

  it('should use proxyquire by callback style', function(done) {
    var params = {
      '../fixtures/test.json': {
        Records: [
          {
            test: 2
          }
        ]
      }
    };
    var callback = factory('../test/assets/require', '../test/fixtures/test.json', params, function(handler, event, context) {
      assert.ok(handler(event, context) === 2);
      done();
    });

    callback();
  });

});