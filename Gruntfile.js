module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Build less files
        less: {
            options: {
                compress: true
            },  
            development: {
                files: {
                    'assets/css/style.min.css': 'assets/less/style.less'
                }
            }
        },
        watch: {
            files: ['assets/less/*'],
            tasks: ['less']
        }

    });

    // Run tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register default task
    grunt.registerTask('default', ['less']);

};