lambda-handler
==============

Factory for create AWS Lambda handler.

## Get started

```
npm install --save-dev lambda-handler
```

## Usage

```
var factory = require('lambda-handler');
var handler = factory('src/index');

var event = {...};
var context = {...};

handler(event, context);
```

or in test

```
var path    = require('path');
var factory = require('lambda-handler');
var helpers = require('./test/helpers.js');

describe('Lambda entry point:', function() {
	var handlerPath = path.resolve('./src/index');
	var fixturePath = path.resolve('./fixture/debug');
	
	var handler, event, context;
	beforeEach(factory(handlerPath, fixturePath, {'aws-sdk', helpers.AWS}, function(_handler, _event, _context) {
		handler = _handler;
		event   = _event;
		context = _context;
	}));

	it('sucessful in invoke', function(done) {
	  context.done = done;
	  
	  handler(event, context);
	});

```
