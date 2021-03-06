'use strict';
/**
 * Create AWS Lambda handler function.
 *
 * @param {String} path path string of AWS Lambda handler
 * @return {Function} AWS Lambda handler
 */
module.exports = function(handlerPath, fixturePath, proxyquire, callback) {
  // initialize
  switch(arguments.length) {
    case 3:
      callback = proxyquire;
      proxyquire = false;
      break;
    case 2:
      callback = fixturePath;
      fixturePath = false;
      break;
    default:
  }
  // load module
	var module;
  if (!!proxyquire) {
    module = require('proxyquire')(handlerPath, proxyquire);
  } else {
    module = require(handlerPath);
    delete(require.cache[handlerPath + '.js']);
  }
  // create event
  var event = {Records: []};
  if (fixturePath) {
    event = require(fixturePath);
    delete(require.cache[fixturePath + '.js']);
  }
  // create context
  var context = require('./context');
  // create callback as beforeEach
  if (typeof(callback) === 'function') {
    var handler = module.handler;
    module.handler = function() {
      callback(handler, event, context);
    };
  }

	return module.handler;
};
