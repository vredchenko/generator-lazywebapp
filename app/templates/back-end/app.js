'use strict';

// 1. Based off the following tutorial:
// http://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose
// 2. Be kind to your API consumers:
// http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

// http://requirejs.org/docs/node.html
var requirejs = require('requirejs');
requirejs.config({
  //Pass the top-level main.js/index.js require
  //function to requirejs so that node modules
  //are loaded relative to the top-level JS file.
  nodeRequire: require
});

var application_root  = __dirname
,   express           = requirejs( 'express'     )
,   cors              = requirejs( 'cors'        )
,   path              = requirejs( 'path'        )
,   mongoose          = requirejs( 'mongoose'    )
//,   im                = requirejs( 'imagemagick' )
,   fs                = requirejs( 'fs'          )
,   app               = express()
,   ProjectModel      = requirejs( './spec/schemas/project.mongoose.schema.js' )()
;

// database connection @todo use values from config
mongoose.connect('mongodb://localhost/my_new_db'); // @todo configure database connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', function callback () {
  console.log("database connection established, :9042/api available for http requests");
});

// Express config
app.configure(function () {
  //app.use(express.bodyParser({uploadDir:'./uploads'}));
  app.use(express.methodOverride());
  app.use(cors());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// API endpoints
app.get ('/', function (req, res) {
  res.send('/api to get the API');
  // @todo serve standard welcome page, perhhaps linking to your landing page
});
app.get ('/api', function (req, res) {
  res.send('API is running');
  // @todo this should be like the bash `man`, bringing up documentation about the API  
});


app.get ('/api/projects', function (req, res) {
  return ProjectModel.find(function (err, projects) {
    if (!err) {
      return res.send(projects);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});
app.get ('/api/projects/:id', function (req, res) {
  return UserModel.findById(req.params.id, function (err, project) {
    if (!err) {
      return res.send(project);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});
app.post ('/api/projects', function (req, res) {
  var obj = new ProjectModel({
    name             : req.body.name
  , value            : req.body.value
  });
  obj.save(function (err) {
    if (err)  {
      console.log( err );
      return res.send( err );
    }
  });
  return res.send( obj );
});
app.put ('/api/projects/:id', function (req, res) {
  return ProjectModel.findById(req.params.id, function (err, project) {
    if (!project) {
      return res.send( {error: "no project with _id:"+req.params.id} );
    }
    project.name           = req.body.name;
    project.value          = req.body.value;
    return project.save(function (err) {
      if (err) {
        console.log( err );
        return res.send( err );
      }
      return res.send(project);
    });
  });
});
app.delete ('/api/projects/:id', function (req, res) {
  return ProjectModel.findById(req.params.id, function (err, user) {
    if (!project) {
      return res.send( {error: "no project with _id:"+req.params.id} );
    }
    return project.remove(function (err) {
      if (!err) {
        return res.send( {removed: project} );
      } else {
        console.log(err);
        return res.send(err);
      }
    });
  });
});


app.listen(9042);