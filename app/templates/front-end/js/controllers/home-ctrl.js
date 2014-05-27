myNewApp.controller('HomeController', ['$scope', '$timeout', function($scope, $timeout) {
     
  $scope.message = "We're home!";
  $scope.func = function() {
  	console.log("I'm a function in home controller scope");
  };

}]);
