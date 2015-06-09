module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: 'src/.jshintrc'
            },
            src: 'src/touchfaker.js'
        },
        jscs: {
            options: {
                config: 'src/.jscsrc'
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
                    'dist/touchfaker.min.js': ['src/touchfaker.js']
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
