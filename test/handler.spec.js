'use strict';

var factory = require('../src/handler');

describe('Lambda handler factory:', function() {
	it('create lambda handler', function() {
		var handler = factory('../test/assets/index');
		expect(handler).toEqual(jasmine.any(Function));
	});

	it('execute lambda handler', function() {
		var handler = factory('../test/assets/index');
		expect(handler()).toBe(true);
	});

});