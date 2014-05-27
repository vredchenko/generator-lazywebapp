// additional underscore.string methods for lodash
_.mixin(_.str.exports());
// console.log(_.slugify('here there go dragons!'));

var myNewApp = angular.module('myNewApp', 
  ['ngRoute', 'ui.bootstrap']
);

myNewApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }).
      when('/page-one', {
        templateUrl: 'templates/page-one.html',
        controller: 'PageOneController'
      }).
      when('/page-two', {
        templateUrl: 'templates/page-two.html',
        controller: 'PageTwoController'
      }).
      otherwise({
        redirectTo: '/'
      }
    );
  }
]);
