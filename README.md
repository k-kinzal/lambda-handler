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
