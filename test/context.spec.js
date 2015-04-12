'use strict';
// require
var AWS    = require('aws-sdk');
var assert = require('power-assert');
var path   = require('path');
var util   = require('util');
// test
describe('Lambda context object:', function() {
  var λ = function(fnString, callback) {
    it(fnString, function(done) {
      require('./helpers/lambda')(fnString, function(payload) {
        eval(fnString);
        callback(context._payload, payload);
        done();
      });
      delete(require.cache[path.resolve('./helpers/lambda.js')]);
    });
  };
  var context;
  beforeEach(function() {
    context = require('../src/context');
    delete(require.cache[path.resolve('../src/context.js')]);
  });
  var log, warn;
  beforeEach(function() {
    log = console.log;
    warn = console.warn;
    console.log = console.warn = function(t) {
      if (t && ~t.indexOf('%')) {
        process.stdout.write(util.format.apply(util, arguments) + '\n');
      }
      if (t.match(/^.+?-.+?-.+?-.+?/)) { // debug
        process.stdout.write(t + '\n');
      }
    };
  });
  afterEach(function() {
    console.log = log;
    console.warn = warn;
  });

  describe('should local context and remote context matches', function() {
    // initialize
    this.timeout(10000);
    // succeed
    λ('context.succeed();', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.succeed(1);', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.succeed("aaa");', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.succeed(["aaa"]);', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.succeed({"aaa": 1});', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.succeed(null);', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.succeed(new Function());', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.succeed(new Error("hogehoge"));', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    // fail
    λ('context.fail();', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.fail(1);', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.fail("aaa");', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.fail(["aaa"]);', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.fail({"aaa": 1});', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.fail(null);', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.fail(new Function());', function(payload1, payload2) {
      assert.ok(payload1.errorMessage === payload2.errorMessage);
      assert.ok(payload1.errorType === payload2.errorType);
    });
    λ('context.fail(new Error("hogehoge"));', function(payload1, payload2) {
      assert.ok(payload1.errorMessage === payload2.errorMessage);
      assert.ok(payload1.errorType === payload2.errorType);
    });
    // done
    λ('context.done();', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.done(null, "success");', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.done(["error"]);', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
    λ('context.done("error", new Error("hogehoge"));', function(payload1, payload2) {
      assert.ok(payload1 === payload2);
    });
  });
});
