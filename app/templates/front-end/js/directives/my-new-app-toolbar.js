myNewApp.directive('myNewAppToolbar', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/my-new-app-toolbar.html',
    link: function(scope, element, attrs) {
      //element.inerHTML = '<h3>directive linkage!</h3>';
      element.on('$destroy', function() { console.log("myNewAppToolbar directive destroyed; @todo perform cleanup"); });
    }
  // , scope: {
  //     foo: '=attr'
  //   }
  };
});
