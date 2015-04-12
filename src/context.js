'use strict';

module.exports = {
  _payload: '',
  awsRequestId: '',
  invokeid: '',
  logStreamName: '',
  succeed: function(result) {
    if (arguments.length > 1) {
      console.warn("function succeed expected at most 1 arguments, got " + arguments.length);
    }

    if(isUndefined(result)) {
      result = null;
    }

    try {
      if (typeof(result) === 'function') {
        throw new TypeError('Process exited before completing request');
      }
      console.log('result: ' + JSON.stringify(result));
      this._payload = JSON.stringify(result);

    } catch(err) {
      var type = err.name;
      var message = err.message;
      console.log("Unable to stringify body as json: " + message);

      this._payload = JSON.stringify({
        "errorMessage": message,
        "errorType": type
      });
    }
  },
  fail: function(error) {
    if (arguments.length > 1) {
      console.warn("function fail expected at most 1 arguments, got " + arguments.length);
    }

    var errorObject;
    if (error instanceof Error) {
      errorObject = {
        errorMessage: error.message,
        errorType: error.name,
        stackTrace: error.stack
      };
    } else if (isUndefinedOrNull(error)) {
      errorObject = {
        errorMessage: null
      };
    } else {
      try {
        errorObject = {
          errorMessage: error ? error.toString() : null
        };
      } catch (err) {
        errorObject = {
          errorMessage: 'fail() called with argument but a problem was encountered while converting it to a to string'
        };
      }
    }
    console.log('result: ' + JSON.stringify(errorObject));
    this._payload = JSON.stringify(errorObject);
  },
  done: function() {
    if (arguments.length > 1) {
      console.warn("function fail expected at most 2 arguments, got " + arguments.length);
    }
    if(isUndefinedOrNull(arguments[0]) && isUndefinedOrNull(arguments[1])) {
      this.succeed();
    } else if (isUndefinedOrNull(arguments[0])) {
      this.succeed(arguments[1]);
    } else if (isUndefinedOrNull(arguments[1])) {
      this.fail(arguments[0]);
    } else {
      //support backwards compatibility by logging message here
      console.log("Error Message: " + arguments[1]);
      this.fail(arguments[0]);
    }
  }
};

function isObject(arg) {
  return typeof(arg) === 'object';
}

function isUndefined(arg) {
  return (typeof arg === "undefined");
}

function isNull(arg) {
  return isObject(arg) && !arg;
}

function isUndefinedOrNull(arg) {
  return isUndefined(arg) || isNull(arg);
}
