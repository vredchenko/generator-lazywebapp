myNewApp.controller('PageOneController', ['$scope', '$timeout', function($scope, $timeout) {
     
  $scope.message = "I'm page one, the one!";
  $scope.func1 = function() {
  	console.log("I'm a function in page-one controller scope");
  };

}]);
