myNewApp.controller('Controller', [
	'$scope', 
	'$location', 
	'$timeout', 
	'api', 
	function($scope, $location, $timeout, api) 
{
  
  console.log('ctrl --> MainController');
  
  // anything added to scope here will be available in child controllers and their templates
  // but keep it thin if you can ;)

  console.log('end of ctrl --> MainController');

}]);