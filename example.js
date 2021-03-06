var stackTraceParser = require('./src/parser');
var assert = require('assert');

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
