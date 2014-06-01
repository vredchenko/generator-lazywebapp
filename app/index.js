'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var LazywebappGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.options['skip-install'] = false;

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
        // and also for the API:
        process.chdir('api');
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the LazyWebApp generator, by lazyval@gmail.com to help bootstrap a node-mongo-angular animal'));


    // @todo Yeoman generators rely on the Inquirer.js prompt system. 
    // Make sure to check out the full documentation over there to learn more about prompt types 
    // (checkboxes, lists, etc) and control helpers (validation, prompt hierarchy, filtering, etc).

    var prompts = [

      {
        type: 'confirm',
        name: 'createBackend',
        message: 'Will we be needing a NodeJS-powered back-end?',
        default: true
      },
      {
        type: 'confirm',
        name: 'createFrontend',
        message: 'Would you like me to bootsrap an AngularJS-powered front-end?',
        default: true
      },
      {
        type:     'checkbox',
        name:     'frontEndLibs',
        message:  'Which libs will you use?',
        choices:  [
          'jquery',
          'lodash',
          'underscore.string',
          'angular-route',
          'angular-bootstrap',
          'ng-table',
          'ng-grid',
          'ng-file-upload'
        ]
      }
      
    ];

    this.prompt(prompts, function (props) {
      this.choices = props;
      done();
    }.bind(this));
  },

  projectDirs: function () {
    
    console.log( this.choices );

    if (this.choices.createBackend) {
      console.log('creating directory structure for a NodeJS back-end');
      this.mkdir( 'api' );
      this.mkdir( 'api/public' );
      this.mkdir( 'api/spec' );
      this.mkdir( 'api/spec/schemas' );
    }

    if (this.choices.createFrontend) {
      console.log('creating directory structure for an AngularJS front-end');
      this.mkdir( 'src'                     );
      this.mkdir( 'src/css'                 );
      this.mkdir( 'src/templates'           );
      this.mkdir( 'src/js'                  );
      this.mkdir( 'src/js/controllers'      );
      this.mkdir( 'src/js/directives'       );
      this.mkdir( 'src/js/providers'        );


      this.mkdir( 'dist' );
      this.mkdir( 'dist/css' );
    }

  },

  metaFiles: function () {
    
    if (this.choices.createBackend) {
      this.copy( 'back-end/_package.json',  'api/package.json');
      this.copy( 'back-end/_bower.json',    'api/bower.json');
      this.copy( 'back-end/_jshintrc',      'api/.jshintrc');
      this.copy( 'back-end/_editorconfig',  'api/.editorconfig');
    }

    if (this.choices.createFrontend) {
      this.copy( 'front-end/_package.json',  'package.json');
      this.copy( 'front-end/_bower.json',    'bower.json');
      this.copy( 'front-end/_jshintrc',      '.jshintrc');
      this.copy( 'front-end/_editorconfig',  '.editorconfig');
      this.copy( 'front-end/_Gruntfile.js',  'Gruntfile.js');

    }
  },

  frontEndFiles: function() {
    if (this.choices.createFrontend) {
      this.copy( 'front-end/index.html',                          'src/index.html' );      
      this.copy( 'front-end/css/index.scss',                      'src/css/index.scss' );

      this.copy( 'front-end/templates/my-new-app-toolbar.html',   'src/templates/my-new-app-toolbar.html' );
      this.copy( 'front-end/templates/home.html',                 'src/templates/home.html' );
      this.copy( 'front-end/templates/page-one.html',             'src/templates/page-one.html' );
      this.copy( 'front-end/templates/page-two.html',             'src/templates/page-two.html' );

      this.copy( 'front-end/js/ng-app.js',                        'src/js/ng-app.js' );
      this.copy( 'front-end/js/controllers/ctrl.js',              'src/js/controllers/ctrl.js' );
      this.copy( 'front-end/js/controllers/home-ctrl.js',         'src/js/controllers/home-ctrl.js' );
      this.copy( 'front-end/js/controllers/page-one-ctrl.js',     'src/js/controllers/page-one-ctrl.js' );
      this.copy( 'front-end/js/controllers/page-two-ctrl.js',     'src/js/controllers/page-two-ctrl.js' );
      this.copy( 'front-end/js/directives/my-new-app-toolbar.js', 'src/js/directives/my-new-app-toolbar.js' );
      this.copy( 'front-end/js/providers/api-provider.js',        'src/js/providers/api-provider.js' );
    }
  },

  backEndFiles: function() {
    if (this.choices.createBackend) {
      this.copy('back-end/app.js',                                'api/app.js');
      this.copy('back-end/schemas/project.mongoose.schema.js',    'api/spec/schemas/project.mongoose.schema.js');
    }
  }

});

module.exports = LazywebappGenerator;
