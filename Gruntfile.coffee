# Generated on 2014-05-11 using generator-library 0.0.1
module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    config:
      src: 'tasks'


    # Utilities
    # ---------

    bump:
      options:
        files: [
          'package.json'
        ]
        commitFiles: [
          'package.json'
        ]
        tagName: '%VERSION%'
        updateConfigs: ['pkg']
        pushTo: 'origin'

    githooks:
      'pre-commit':
        'pre-commit': 'static-analysis'


    # Static Analysis
    # ---------------

    jshint:
      options:
        report: require 'jshint-stylish'
        jshintrc: '.jshintrc'
      src: [
        '<%= config.src %>/**/*.js'
      ]

    jscs:
      options:
        config: '.jscsrc'
      src: '<%= config.src %>/**/*.js'


  # Public Tasks
  # ------------

  grunt.registerTask 'static-analysis', [
    'jshint'
    'jscs'
  ]

  grunt.registerTask 'build', [
    'static-analysis'
  ]

  grunt.registerTask 'default', ['build']
