'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['src/knockout-ease.js'],
            options: {
                jshintrc: true
            }
        },

        concat: {
            dist: {
                files: {
                    'dist/knockout-ease.debug.js': ['src/knockout-ease.js']
                }
            }
        },

        uglify: {
            options: {
                preserveComments: 'some'
            },
            build: {
                files: {
                    'dist/knockout-ease.min.js': 'src/knockout-ease.js',
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};