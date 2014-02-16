var _ = require('lodash');

var evalRegex = /at .*\.eval/;

var getEvalDetails = function(line) {
  var evalDetails = {
    isEval: line.indexOf('at eval') !== -1 || evalRegex.test(line)
  };

  if (evalDetails.isEval) {
    var evalDetailsArray = line.substring(line.lastIndexOf(', ') + 2, line.lastIndexOf(')')).split(':');
    _.extend(evalDetails, {
      evalFileName: evalDetailsArray[0],
      evalLineNumber: parseInt(evalDetailsArray[1], 10),
      evalColumnNumber: parseInt(evalDetailsArray[2], 10)
    });
  }

  return evalDetails;
};

var getFileDetails = function(line) {
  var fileDetailsArray = line.substring(line.lastIndexOf('(') + 1, line.length - 1).split(':');
  return {
      fileName: fileDetailsArray[0],
      lineNumber: parseInt(fileDetailsArray[1], 10),
      columnNumber: parseInt(fileDetailsArray[2], 10)
    };
};

var getFunctionName = function(line) {
  var afterAtIndex = line.indexOf('at ') + 'at '.length,
      spaceAfterFunctionIndex = line.indexOf(' ', afterAtIndex);

  return {
    functionName: line.substring(afterAtIndex, spaceAfterFunctionIndex)
  };
};

var getTypeAndMessage = function(line) {
  var typeAndMessageArray = line.split(': ');

  return {
    type: typeAndMessageArray[0],
    message: typeAndMessageArray[1]
  };
};

module.exports = {
  parse: function(error) {
    var lines = error.stack.split('\n');

    var typeAndMessage = getTypeAndMessage(lines[0]);
    var parsedLines = lines.slice(1).map(this.parseLine);

    return _.extend(typeAndMessage, parsedLines);
  },

  parseLine: function(line) {
    return _.extend(
        getFileDetails(line),
        getEvalDetails(line),
        getFunctionName(line)
    );
  }
};
