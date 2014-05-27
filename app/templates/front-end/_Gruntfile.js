module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port:     9052,
          hostname: "0.0.0.0",
          bases:    ['dist'],  // Replace with the directory you want the files served from
                               // Make sure you don't use `.` or `..` in the path as Express
                               // is likely to return 403 Forbidden responses if you do
                               // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },
    clean: {
      build: {
        src: ["dist"]
      }
    },
    copy: {
      html: {
        files: [
          {
            expand: true,       // Enable dynamic expansion.
            cwd: 'src/',        // Src matches are relative to this path.
            src: ['**/*.html'], // Actual pattern(s) to match.
            dest: 'dist/',      // Destination path prefix.
            ext: '.html',       // Dest filepaths will have this extension.
            extDot: 'first'     // Extensions in filenames begin after the first dot
          }
        ]
      }
    },
    bower_concat: {
      all: {
        dest: 'dist/js/bower-libs.js',
        // exclude: [ // 'jquery', 'modernizr'
        //   //'bootstrap'
        // ],
        // include: [ // by default, all bower components are included
        //   // 'angular', 'angular-route'
        // ],
        dependencies: { // enfore order of concatenation via dependencies
          'underscore.string': 'lodash',
          'angular': ['jquery'],
          'angular-route': 'angular'
        },
        bowerOptions: {
          relative: false
        },
        mainFiles: {
          'underscore.string': 'dist/underscore.string.min.js'
        }
      }
    },
    concat: {
      options: {
        //separator: ';'
      },
      dist: {
        src: [
          //'src/js/jquery-ui-1.10.4.custom.js', 
          'src/js/ng-app.js', 
          'src/js/providers/**/*.js', 
          'src/js/directives/**/*.js',
          'src/js/controllers/**/*.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: { //@todo uglify bower-libs.js
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          laxcomma: true
        }
      }
    },
    compass: {                  
      dist: { 
        options: { 
          sassDir: 'src/css',
          cssDir: 'dist/css'
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'src/index.html', 'src/templates/**/*.html', 'src/css/**/*.scss'],
      tasks: ['build'],
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('build', ['jshint', 'clean', 'bower_concat', 'concat', 'uglify', 'copy', 'compass']);
  grunt.registerTask('serve', ['build', 'express', 'open', 'watch']);
  grunt.registerTask('default', []);

};