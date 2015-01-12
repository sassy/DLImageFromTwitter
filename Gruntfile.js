"use strict";

module.exports = function(grunt) {
    grunt.initConfig({        
        jshint: {
            options: {
                node: true
            },
            files: {
                src: ['*.js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
