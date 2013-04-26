'use strict';

module.exports = function (grunt) {
	var fs = require('fs');
	var _ = require('_');

	var requiredOptions = [
		'components',
		'src',
		'dest'
	];

	grunt.registerTask('customizeBootstrap', function() {
		var done = this.async();

		_.each(requiredOptions, function(option) {
			grunt.config.requires(['options', option]);
		});

		var bootstrapPath = grunt.config('options.components') + 'components/bootstrap/less/';

		fs.readDir(grunt.config('src'), function(err, overrides) {
			if (err) {
				done(false);
			}

			fs.readFile(bootstrapPath + 'bootstrap.less', function(err, bootstrapLess) {
				if (err) {
					done(false);
				}

				// First, replace each overridden item in the original bootstrap.less with the path to the
				// its override.
				_(overrides).each(function(filename) {
					bootstrapLess = bootstrapLess.replace('"' + filename, '"' + grunt.config('src') + '/' + filename);
				});

				// Now, adjust the paths on the non-overridden files so that the less
				// compiler can find them from the location of the new bootstrap.less.
				// We make sure we only match items inside quotes that do not start with a leading .
				var pattern = new RegExp('@import "(' + bootstrapPath + '[^.][\\w\\.\\-_]*?)"');
				bootstrapLess = bootstrapLess.replace(pattern, '@import "' + grunt.config('dest') + '$1"');

				// Finally, write the new bootstrap.less to the dest directory.
				fs.exists(grunt.config('dest'), function(exists) {
					if (exists) {
						fs.writeFile(grunt.config('dest') + '/bootstrap.less', bootstrapLess, function(err) {
							if (err) {
								done(false);
							}
							done(true);
						});
					}
					else {
						fs.mkdir(grunt.config('dest'), function(err) {
							if (err) {
								done(false);
							}

							fs.writeFile(grunt.config('dest') + '/bootstrap.less', bootstrapLess, function(err) {
								if (err) {
									done(false);
								}
								done(true);
							});
						});
					}
				});
			});
		});
	});
};