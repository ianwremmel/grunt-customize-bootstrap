/*
 * grunt-customize-bootstrap
 * https://github.com/ianwremmel/grunt-customize-bootstrap
 *
 * Copyright (c) 2013 Ian Remmel
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	var fs = require('fs');
	var _ = require('lodash');

	var requiredOptions = [
		'components',
		'src',
		'dest'
	];

	grunt.registerMultiTask('customizeBootstrap', 'Builds bootstrap.less and responsive.less by substituting paths to locally overridden files', function() {
		var options = this.options({
			components: 'components',
			src: 'src/bootstrap',
			dest: '.tmp',
			responsive: false
		});

		var lessPath = options.components + '/bootstrap/less';

		var parseManifest = function(filename) {
			var manifestFile = grunt.file.read(filename);
			var pattern = /@import "([\w\.-]+)";/;

			var start = 0;
			var match;
			var manifest = [];
			while (match = pattern.exec(manifestFile.substring(start))) {
				manifest.push(match[1]);
				start += match['index'] + 1;
			}

			return manifest;
		};

		var createManifest = function(manifest, overrides) {
			var levels = options.dest.split('/').length;
			var prefix = new Array(levels + 1).join('../');

			var less = '';
			_(manifest).each(function(filename) {
				less += '@import "' + prefix;
				if (_(overrides).contains(filename)) {
					less += options.src + '/' + filename;
				}
				// This is a terrible way to do this comparison, but no more efficient
				// option that doesn't produce unreadable code seems to present itself.
				else if (filename === options.local) {
					less += filename;
				}
				else {
					less += lessPath + '/' + filename;
				}
				less += '";' + "\n";
			});

			return less;
		};

		// Remove trailing slashes
		var pattern = /\/$/;
		_(options).each(function(option) {
			// Make sure option has a replace method
			if (option.replace) {
				option = option.replace(pattern, '');
			}
		});

		// Determine which files have been overridden
		var overrides = grunt.file.expand({cwd: options.src}, '*');

		// Read bootstrap.less and insert the local less file right before
		// utilities.less (which must always come last)
		var bootstrapManifest = parseManifest(lessPath + '/bootstrap.less');
		if (options.local) {
			var utilities = bootstrapManifest.pop();
			bootstrapManifest.push(options.local);
			bootstrapManifest.push(utilities);
		}

		// Turn the manifest back into a string
		var bootstrapDotLess = createManifest(bootstrapManifest, overrides);

		// Write the new manifest to its new location
		grunt.file.write(options.dest + '/bootstrap.less', bootstrapDotLess);

		// Repeat the above (without local less) for the responsive styles (if
		// desired).
		if (options.responsive) {
			var responsiveManifest = parseManifest(lessPath + '/responsive.less');
			var responsiveDotLess = createManifest(responsiveManifest, overrides);

			grunt.file.write(options.dest + '/responsive.less', responsiveDotLess);
		}
	});
};