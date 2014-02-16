# stack-trace-parser [![Build Status](https://travis-ci.org/cymen/node-stack-trace-parser.png?branch=master)](https://travis-ci.org/cymen/node-stack-trace-parser)

[![NPM](https://nodei.co/npm/stack-trace-parser.png?downloads=true&stars=true)](https://npmjs.org/package/stack-trace-parser)

`stack-trace-parser` parses stack traces

## Examples

### Error exception
From `example.js`:

    var stackTraceParser = require('./src/parser')
        assert = require('assert');

    try {
      throw new Error('just got real');
    }
    catch (exception) {
      var stackTrace = stackTraceParser.parse(exception);

      assert(stackTrace.type === 'Error', "Expected stack trace type to be Error but instead it is " + stackTrace.type);
      assert.strictEqual(stackTrace.message, 'just got real', "Expected stack trace message to be 'just got real' but instead it is: " + stackTrace.message);
      assert(stackTrace[0].fileName.indexOf('example.js') !== -1, "Expected file name to contain 'example.js'!");
      assert.strictEqual(stackTrace[0].lineNumber, 5, "Expected line number to match line 5 of this file!");
      assert.strictEqual(stackTrace[0].columnNumber, 9, "Expected column number to match column 9 of this file!");
    }

### ReferenceError exception
From `example-undefined.js`:

    var stackTraceParser = require('./src/parser')
        assert = require('assert');

    try {
      d = d * 2;
    }
    catch (exception) {
      var stackTrace = stackTraceParser.parse(exception);

      assert(stackTrace.type === 'ReferenceError', "Expected stack trace type to be ReferenceError but instead it is " + stackTrace.type);
      assert.strictEqual(stackTrace.message, 'd is not defined', "Expected stack trace message to be 'd is not defined' but instead it is: " + stackTrace.message);
      assert(stackTrace[0].fileName.indexOf('example-undefined.js') !== -1, "Expected file name to contain 'example-undefined.js'!");
      assert.strictEqual(stackTrace[0].lineNumber, 5, "Expected line number to match line 5 of this file not " + stackTrace[0].lineNumber);
      assert.strictEqual(stackTrace[0].columnNumber, 7, "Expected column number to match column 7 of this file not " + stackTrace[0].columnNumber);
    }

### Handling eval exception
From `example-eval.js`:

    var stackTraceParser = require('./src/parser')
        assert = require('assert');

    try {
      var code =
        'var a = 10;\n' +
        '\n' +
        'a = a * z;';

      eval(code);
    }
    catch (exception) {
      var stackTrace = stackTraceParser.parse(exception);

      assert(stackTrace.type === 'ReferenceError', "Expected stack trace type to be ReferenceError but instead it is " + stackTrace.type);
      assert.strictEqual(stackTrace.message, 'z is not defined', "Expected stack trace message to be 'd is not defined' but instead it is: " + stackTrace.message);
      assert(stackTrace[0].isEval, "Expected first line of stack trace to be for eval");
      assert.strictEqual(stackTrace[0].evalLineNumber, 3, "Expected line number of eval to be 3 but instead " + stackTrace[0].evalLineNumber);
      assert.strictEqual(stackTrace[0].evalColumnNumber, 9, "Expected line number of eval to be 9 but instead " + stackTrace[0].evalColumnNumber);
    }
