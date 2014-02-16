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
