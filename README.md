# stack-trace-parser [![Build Status](https://travis-ci.org/cymen/node-stack-trace-parser.png?branch=master)](https://travis-ci.org/cymen/node-stack-trace-parser)

[![NPM](https://nodei.co/npm/stack-trace-parser.png?downloads=true&stars=true)](https://npmjs.org/package/stack-trace-parser)

`stack-trace-parser` parses stack traces

## parses exception.trace

### example (from `example.js`)

    var stackTraceParser = require('./src/parser')
        assert = require('assert');

    try {
      throw new Error('just got real');
    }
    catch (exception) {
      var stackTrace = stackTraceParser.parse(exception);

      assert(stackTrace[0].fileName.indexOf('example.js') !== -1, "Expected file name to contain 'example.js'!");
      assert.strictEqual(stackTrace[0].lineNumber, 5, "Expected line number to match line 5 of this file!");
      assert.strictEqual(stackTrace[0].columnNumber, 9, "Expected column number to match column 9 of this file!");
    }
