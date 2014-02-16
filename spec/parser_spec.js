var parser = require('../src/parser');

describe('parser', function() {

  describe('parsing one line', function() {
    it('parses out the file details', function() {
      var line = 'at [object Object].global.every [as _onTimeout] (/Users/hoitz/develop/test.coffee:36:3)';

      var parsedLine = parser.parseLine(line);

      expect(parsedLine.fileName).toBe('/Users/hoitz/develop/test.coffee');
      expect(parsedLine.lineNumber).toBe(36);
      expect(parsedLine.columnNumber).toBe(3);
    });

    it('parses out the function name', function() {
      var line = 'at it.fn (/Users/cvig/dev/literate-jasmine/src/parser.js:106:37)';

      var parsedLine = parser.parseLine(line);

      expect(parsedLine.functionName).toBe('it.fn');
    });

    it('parses out eval details', function() {
      var line = 'at eval (eval at <anonymous> (/Users/cvig/dev/literate-jasmine/src/parser.js:106:16), <anonymous>:7:16)';

      var parsedLine = parser.parseLine(line);

      expect(parsedLine.fileName).toBe('/Users/cvig/dev/literate-jasmine/src/parser.js');
      expect(parsedLine.lineNumber).toBe(106);
      expect(parsedLine.columnNumber).toBe(16);

      expect(parsedLine.isEval).toBe(true);
      expect(parsedLine.evalFileName).toBe('<anonymous>');
      expect(parsedLine.evalLineNumber).toBe(7);
      expect(parsedLine.evalColumnNumber).toBe(16);
    });

    it('parses out eval details even if entry differs', function() {
      var line = 'at Object.eval (eval at <anonymous> (/Users/cvig/dev/node-stack-trace-parser/example-eval.js:10:8), <anonymous>:1:20)';

      var parsedLine = parser.parseLine(line);

      expect(parsedLine.isEval).toBe(true);
      expect(parsedLine.evalFileName).toBe('<anonymous>');
      expect(parsedLine.evalLineNumber).toBe(1);
      expect(parsedLine.evalColumnNumber).toBe(20);
    });
  });

  describe('stack trace', function() {
    var error;

    beforeEach(function() {
      error = {};
    });

    it('parses the file names from a basic stack trace', function() {
      error.stack =
        'Error: Foo\n' +
        '    at [object Object].global.every [as _onTimeout] (/Users/hoitz/develop/test.coffee:36:3)\n' +
        '    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)\n';

      parsed = parser.parse(error);

      expect(parsed[0].fileName).toBe('/Users/hoitz/develop/test.coffee');
      expect(parsed[1].fileName).toBe('timers.js');
    });

    it('parses type exception type', function() {
      error.stack = 
        'ReferenceError: d is not defined\n' +
        '    at Object.<anonymous> (/Users/cvig/dev/node-stack-trace-parser/example-undefined.js:5:7)\n' +
        '    at Module._compile (module.js:456:26)\n' +
        '    at Object.Module._extensions..js (module.js:474:10)\n' +
        '    at Module.load (module.js:356:32)\n' +
        '    at Function.Module._load (module.js:312:12)\n' +
        '    at Function.Module.runMain (module.js:497:10)\n' +
        '    at startup (node.js:119:16)\n' +
        '    at node.js:902:3\n';

      parsed = parser.parse(error);

      expect(parsed.type).toBe('ReferenceError');
      expect(parsed.message).toBe('d is not defined');
    });
  });
});
