angular.module('integer', [])

.factory('integer', function () {
  'use strict';

  var NOT_INTEGER = /[^0-9]/g;
  
  var integer = function (input) {
    var output = parseInt(input.replace(NOT_INTEGER, ''), 10);
    if (!isNaN(output)) { return output; }
  };
  
  return integer;
})

.directive('integer', function (integer) {
  'use strict';

  var link = function (scope, element, attrs, modelCtrl) {
    modelCtrl.$parsers.push(function (input) {
      var output = integer(input);
      modelCtrl.$viewValue = typeof output === 'undefined' ? '' : '' + output;
      modelCtrl.$render();
      return output;
    });
  };
        
  return {
    restrict: 'A',
    require: 'ngModel',
    link: link
  };
});
