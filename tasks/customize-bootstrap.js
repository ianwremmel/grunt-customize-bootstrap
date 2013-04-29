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
			dest: '.tmp'
		});

		var bootstrapPath = options.components + '/bootstrap/less/';

		fs.readdir(options.src, function(err, overrides) {
			if (err) {
				done(false);
			}

			var build = function(filename, callback) {
				fs.readFile(bootstrapPath + filename, function(err, bootstrapLess) {
					if (err) {
						done(false);
					}

					bootstrapLess = bootstrapLess.toString();
					// First, replace each overridden item in the original bootstrap.less with the path to the
					// its override.
					var levels = options.dest.split('/');
					var srcPath = Array(levels.length + 1).join('../') + options.src;
					_(overrides).each(function(filename) {
						bootstrapLess = bootstrapLess.replace('"' + filename, '"' + srcPath + '/' + filename);
					});

					// Now, adjust the paths on the non-overridden files so that the less
					// compiler can find them from the location of the new bootstrap.less.
					// We make sure we only match items inside quotes that do not start with a leading .
					var pattern = new RegExp('@import "(?!' + srcPath + ')(.*?)"', 'g');
					var destPath = Array(levels.length + 1).join('../') + bootstrapPath;
					bootstrapLess = bootstrapLess.replace(pattern, '@import "' + destPath + '$1"');

					// Finally, write the new bootstrap.less to the dest directory.
					fs.exists(options.dest, function(exists) {
						if (exists) {
							fs.writeFile(options.dest + '/' + filename, bootstrapLess, function(err) {
								if (err) {
									done(false);
								}
								if (!callback) {
									done(true);
								}
								else {
									callback();
								}
							});
						}
						else {
							fs.mkdir(options.dest, function(err) {
								if (err) {
									done(false);
								}

								fs.writeFile(options.dest + '/' + filename, bootstrapLess, function(err) {
									if (err) {
										done(false);
									}
									if (!callback) {
										done(true);
									}
									else {
										callback();
									}
								});
							});
						}
					});
				});
			};

			build('bootstrap.less', function() {
				if (options.responsive) {
					build('responsive.less');
				}
			});
		});
	});
};