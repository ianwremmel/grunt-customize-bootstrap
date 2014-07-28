'use strict';

var _ = require('lodash');

var path = require('path');

module.exports = function(grunt) {
  var options;

  var parseManifest = function parseManifest(filename) {
    var data = grunt.file.read(filename);

    var pattern = /@import "([\w\.-]+)";/g;

    var manifest = [];
    var match;
    while ((match = pattern.exec(data)) !== null) {
      manifest.push(match[1]);
    }

    return manifest;
  };

  var processManifest = function processManifest(manifest, overrides) {
    var overridePrefix = path.relative(options.dest, options.src);
    var origPrefix = path.relative(options.dest, path.join(options.bootstrapPath, 'less'));

    var less = manifest.map(function(filename) {
      var prefix;

      if (_.contains(overrides, filename)) {
        prefix = overridePrefix;
      }
      else if (options.local && filename === options.local) {
        prefix = '';
      }
      else {
        prefix = origPrefix;
      }

      return '@import "' + path.join(prefix, filename) + '";';
    }).join('\n');

    return less;
  };

  return function() {

    options = this.options({
      bootstrapPath: 'bower_components/bootstrap',
      src: 'src/styles/bootstrap/',
      dest: 'src/styles'
    });

    var manifest = parseManifest(path.join(options.bootstrapPath, 'less', 'bootstrap.less'));

    // Insert local styles above utilities.less (which must come last).
    if (options.local) {
      var utilities = manifest.pop();
      manifest.push(options.local);
      manifest.push(utilities);
    }

    // Search options.src for less files to use to override Bootstrap's core.
    var overrides = grunt.file.expand({cwd: options.src}, '*.less');
    manifest = processManifest(manifest, overrides);

    var destFile = path.join(options.dest, 'bootstrap.less');
    grunt.file.write(destFile, manifest);
    grunt.log.writeln('File ' + destFile.cyan + ' created');
  };
};
