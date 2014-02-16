var stackTraceParser = require('./src/parser')
    assert = require('assert');

try {
  d = d * 2;
}
catch (exception) {
  var stackTrace = stackTraceParser.parse(exception);

  assert(stackTrace[0].fileName.indexOf('example-undefined.js') !== -1, "Expected file name to contain 'example-undefined.js'!");
  assert.strictEqual(stackTrace[0].lineNumber, 5, "Expected line number to match line 5 of this file not " + stackTrace[0].lineNumber);
  assert.strictEqual(stackTrace[0].columnNumber, 7, "Expected column number to match column 7 of this file not " + stackTrace[0].columnNumber);

  throw exception;
}
