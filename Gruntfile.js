
'use strict';
/*
 * lambda handler
 * https://github.com/k-kinzal/lambda-handler
 *
 * Copyright (c) 2014 k-kinzal
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
  // grunt configuration
  grunt.initConfig({
  	watch: {
  		debug: {
  			files: [
          'src/*.js',
        	'test/*.spec.js',
          'Gruntfile.js'
        ],
  			tasks: ['test']
  		}
  	},
	  jshint: {
	    options: {
	      jshintrc: '.jshintrc',
	      force: true,
		    reporter: require('jshint-stylish')
	    },
	    all: [
	      'src/*.js',
        'test/*.spec.js',
        'Gruntfile.js'
	    ]
	  },
    'jasmine_node': {
      all: ['test/']
    }
  });
  // tasks
  grunt.registerTask('debug', function() {
    grunt.loadNpmTasks('grunt-regarde');
    grunt.renameTask('regarde', 'watch');
    grunt.option("force", true);
    grunt.task.run([
      'watch'
    ]);
  });
  grunt.registerTask('test', function() {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node'); 
    grunt.task.run([
      'jshint',
      'jasmine_node'
    ]);
  });
};
