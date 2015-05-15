module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: 'touchFaker.js'
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: '<%= jshint.src %>'
        },
        uglify: {
            options: {
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: 'some'
            },
            dist: {
                files: {
                    'touchFaker.min.js': ['touchFaker.js']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    grunt.registerTask('test', ['jshint', 'jscs']);
    grunt.registerTask('dist', ['test', 'uglify:dist']);
    grunt.registerTask('default', ['dist']);
};
