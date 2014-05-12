/*
 * grunt-customize-bootstrap
 * https://github.com/ianwremmel/grunt-customize-bootstrap
 *
 * Copyright (c) 2013 Ian Remmel
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var description = 'Generates bootstrap.less and responsive.less by substituting paths to locally overridden files';

  var task = require('../lib/task')(grunt);

  grunt.registerMultiTask('customize-bootstrap', description, task);
  grunt.registerMultiTask('customize_bootstrap', description, task);
  grunt.registerMultiTask('customizeBootstrap', description, task);
};
