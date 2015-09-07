module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'http-server': {
     
        'dev': {
 
            // the server root directory 
            root: "./",
 
            // the server port 
            // can also be written as a function, e.g. 
            // port: function() { return 8282; } 
            port: 8282,
 
            // the host ip address 
            // If specified to, for example, "127.0.0.1" the server will 
            // only be available on that ip. 
            // Specify "0.0.0.0" to be available everywhere 
            host: "0.0.0.0",
 
            cache: 10,
            showDir : true,
            autoIndex: true,
 
            // server default file extension 
            ext: "html",
 
            // run in parallel with other tasks 
            runInBackground: false,
 
            // specify a logger function. By default the requests are 
            // sent to stdout. 
            logFn: function(req, res, error) { },
 
            /// Use 'https: true' for default module SSL configuration 
            /// (default state is disabled) 
            
 
        }
 
    },

    
    uglify: {
      production: {
        files: {
          'dist/js/scripts.min.js' : ['src/javascripts/lib/jquery.min.js', 'src/bootstrap-sass/assets/javascripts/bootstrap.js', 'src/javascripts/custom/*.js']
        }
      },
      development: {
        options: {
          beautify: true, 
          mangle: false,
          compress: false,
          preserveComments: 'all'
        },
        files: {
          'dist/js/scripts.min.js' : ['src/javascripts/lib/jquery.min.js', 'src/bootstrap-sass/assets/javascripts/bootstrap.js', 'src/javascripts/custom/*.js']
        }
      }
    },

    sass:{
      development: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'dist/css/styles.css' : 'src/scss/application.scss'
        }
      },
      production: {
        options:{
          outputStyle: 'compressed'
        },
        files:{
          'dist/css/styles.css' : 'src/scss/application.scss' 
        }
      }
    },

    watch: {
      js: {
        files: ['src/javascripts/**/*.js'],
        tasks: ['uglify:development']
      },
      css:{
        files: ['src/scss/*.scss', 'src/bootstrap-sass/assets/stylesheets/**/*.scss'],
        tasks: ['sass:development']
      }
    }


    
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify:development', 'sass:development']);
  grunt.registerTask('production', ['uglify:production', 'sass:production']);

};