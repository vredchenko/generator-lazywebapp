if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
  var mongoose          = require( 'mongoose'  )
  ,   Schema            = mongoose.Schema
  ;

  //The value returned from the function is
  //used as the module export visible to Node.
  return function () {
    var projectSchema = new Schema({
      name: {
        type:         String,
        required:     true
      },
      value: {
        type:         String,
        required:     true
      }
    });
    return mongoose.model( 'Project', projectSchema );
  };
});
