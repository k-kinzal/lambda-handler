'use strict';
// require
var factory = require('../src/handler');
// test
describe('Lambda handler factory:', function() {
	it('create lambda handler', function() {
		var handler = factory('../test/assets/index');
		expect(handler).toEqual(jasmine.any(Function));
	});

	it('execute lambda handler', function() {
		var handler = factory('../test/assets/index');
		expect(handler()).toBe(true);
	});

  it('execute lambda handler by callback style', function(done) {
    var callback = factory('../test/assets/index', function(handler, event, context) {
      expect(handler(event, context)).toBe(true);
      expect(event).toEqual({Records: []});
      expect(context.done).toBeDefined();
      done();
    });

    callback();
  });

  it('get fixture as event param by callback style', function(done) {
    var callback = factory('../test/assets/index', '../test/fixtures/test.json', function(handler, event, context) {
      expect(event.Records[0].test).toBe(1);
      done();
    });

    callback();
  });

  it('use proxyquire by callback style', function(done) {
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
      expect(handler(event, context)).toBe(2);
      done();
    });

    callback();
  });

});