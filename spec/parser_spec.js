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
  });

  xdescribe('simple stack trace', function() {
    var error = {},
        parsed;

    beforeEach(function() {
      error.stack =
        'Error: Foo\n' +
        '    at [object Object].global.every [as _onTimeout] (/Users/hoitz/develop/test.coffee:36:3)\n' +
        '    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)\n';
      parsed = parser.parse(error);
    });

    it('parses the file names from a basic stack trace', function() {
        expect(parsed[0].getFileName()).toBe('/Users/hoitz/develop/test.coffee');
        expect(pasred[1].getFileName()).toBe('timers.js');
    });
  });
});
