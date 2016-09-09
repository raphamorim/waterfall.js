var grunt = require('grunt');

grunt.initConfig({
   uglify: {
      my_target: {
         files: {
            'waterfall.min.js': ['src/**/*.js']
         }
      }
   },

   watch: {
      dist: {
         files: ['src/**/*.js'], 
	      tasks: ['uglify']
      }
   }
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['uglify']);
module.exports = grunt;
