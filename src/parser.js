var _ = require('lodash');

var getEvalDetails = function(line) {
  var evalDetails = {
    isEval: line.indexOf('at eval') !== -1
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

module.exports = {
  parseLine: function(line) {
    return _.extend(
        getFileDetails(line),
        getEvalDetails(line),
        getFunctionName(line)
    );
  }
};
