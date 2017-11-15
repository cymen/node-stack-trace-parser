var stackTraceParser = require('./src/parser');
var assert = require('assert');

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
