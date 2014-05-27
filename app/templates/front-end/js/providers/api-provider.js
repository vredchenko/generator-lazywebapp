myNewApp.provider('api', function() {
  
  this.$get = function($http) {
    
    // set headers like so?
    // $http.defaults.headers.common['Header Name'] = 'Header Value'
    // $http.defaults.headers.post
    // $http.defaults.headers.put

    var apiURL = 'http://localhost:9042';

    return {
      object: {
        getById            : function(obj_id) {
          return $http( {method: 'GET', url: apiURL+'/api/objects/'+obj_id, cache: false } );
        },
        create             : function(doc) {
          return $http( {method: 'POST', url: apiURL+'/api/objects', data: doc, cache: false } );
        },
        update             : function(doc) {
          return $http( {method: 'PUT', url: apiURL+'/api/objects/'+doc._id, data: doc, cache: false } );
        },
        list               : function() {
          return $http( {method: 'GET', url: apiURL+'/api/objects', cache: false } );
        },
        remove             : function(obj_id) {
          return $http( {method: 'DELETE', url: apiURL+'/api/objects/'+obj_id, cache: false } );
        }
      },
      anotherDataTypeNamespace: {
        
      }
    };
  };

  // custom set up for a provider
  this.init = function(initProcedure) {
    initProcedure = initProcedure || 'default';
    switch (initProcedure) { 
      case 'default':
        this.foo = 'bar';
        break;
      case 'something-else':
        this.bar = 'foo';
        break;
    }
  };
});

// configure provider (I'm sure this code is broken):            
// myNewAppApp.config(function(appStateProvider){
//   appStateProvider.init('clear-storage'); // pass 'default' for production bahavior
// });
