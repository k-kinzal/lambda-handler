'use strict';
/**
 * Create AWS Lambda handler function.
 *
 * @param {String} path path string of AWS Lambda handler
 * @return {Function} AWS Lambda handler
 */
module.exports = function(path) {
	var module = require(path);

	return module.handler;
};