myNewApp.controller('PageTwoController', ['$scope', '$timeout', function($scope, $timeout) {
     
  $scope.message = "I'm page two, but I'm also not bad!";
  $scope.func2 = function() {
  	console.log("I'm a function in page-two controller scope");
  };

}]);
