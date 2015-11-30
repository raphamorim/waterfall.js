var grunt = require('grunt');

grunt.initConfig({
   uglify: {
      my_target: {
         files: {
            'lib/waterfall.min.js': ['lib/waterfall.js']
         }
      }
   }, // Uglify

   watch: {
      dist: {
         files : ['lib/waterfall.js'],
	    tasks : ['uglify']
   	 }
      } // Watch
   });

// Tasks
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');

// Start Watch
grunt.registerTask('w', ['watch']);

module.exports = grunt;