'use strict';
// require
var AWS     = require('aws-sdk');
var Promise = require('bluebird');
var JSZip   = require('node-zip');
var assert  = require('power-assert');
var path    = require('path');
var uuid    = require('uuid');
// initialize
var lambda = Promise.promisifyAll(new AWS.Lambda(), {suffix: 'Promise'});
// 
module.exports = function λ(fnString, callback) {
  var funcName = uuid.v4();
  var payload;

  Promise.resolve().then(function() {
    // upload function
    var zip = new JSZip();
    zip.file('index.js', 'exports.handler = function(event, context) { ' + fnString + ' };');
    var params = {
      Code: {
        ZipFile: zip.generate({type: 'nodebuffer'})
      },
      FunctionName: funcName,
      Handler: 'index.handler',
      Role: 'arn:aws:iam::125043710017:role/lambda_basic_execution',
      Runtime: 'nodejs'
    };
    return lambda.createFunctionPromise(params);

  }).then(function() {
    // invoke function
    var params = {
      FunctionName: funcName
    };
    return lambda.invokePromise(params);
  }).then(function(data) {
    payload = data.Payload;

  }).catch(function(err) {
    // error
    throw err;

  }).finally(function() {
    // delete function
    var params = {
      FunctionName: funcName
    };
    lambda.deleteFunctionPromise(params).then(function() {
      callback(payload);
    });

  });

}