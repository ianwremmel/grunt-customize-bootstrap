# grunt-customize-bootstrap [![GitHub version](https://badge.fury.io/gh/ianwremmel%2Fgrunt-customize-bootstrap.svg)](http://badge.fury.io/gh/ianwremmel%2Fgrunt-customize-bootstrap)

> Plugin to aid in overriding bootstrap less files without altering core files.

## Getting Started
This plugin requires Grunt `^0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-customize-bootstrap --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-customize-bootstrap');
```

## The "customize-bootstrap" task

Let's face it, while we all love Bootstrap, there's really no obvious way to override just the parts you want. Most likely, downloaded Bootstrap with Bower, but you can't modify the source LESS files because if bootstrap updates, your changes will be lost. You can't copy the LESS files into your project because if you do, what was the point in using Bower in the first place? You could override what you need to by just rewriting the chunks of LESS that you need to change, but order is important; can you be certain that your new definition won't come too late?

Instead, use this Grunt task. Any time you need to make a change to a Bootstrap core style, copy the file where it's defined to the folder specified by `options.src` and make your changes there. After running `grunt customize-bootstrap`, you'll have a new `bootstrap.less` file that includes all of your changes.

*Note: this task simply generates a new `bootstrap.less`. You'll need to use another plugin (e.g. `grunt-contrib-less` to actually generate your final CSS.*

### Overview
In your project's Gruntfile, add a section named `customize-bootstrap` to the data object passed into `grunt.initConfig()`.

Note: `customize_bootstrap` or `customizeBootstrap` are also valid task names.

```JavaScript
grunt.initConfig({
  'customize-bootstrap': {
    yourTarget: {
      options: {
        bootstrapPath: 'node_modules/bootstrap',
        src: 'src/styles/bootstrap/',
        dest: 'src/styles/',
      }
    },
  },
})
```

### Options


#### options.bootstrapPath

Type: `String`  
Default: `bower_components/bootstrap`  

Location of the `bootstrap` directory.

#### options.src

Type: `String`  
Default: `src/styles/bootstrap/`  

Location of the overridden Bootstrap files. Must be a directory.

#### options.dest

Type: `String`  
Default: `src/styles/`  

Location to place the generated `bootstrap.less`.

#### options.local

Type: `String`  
Default value: `null`  

Name of LESS file containing local styles to integrate into Bootstrap.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 0.2.0 Replaced `components` option with `bootstrapPath` option to support bootstrap in npm.
- 0.1.5 Code cleanup; removed features specific to Bootstrap 2.x.
- 0.1.2 Added support for a local less file. Rewrote customize task to use grunt file api, synchronous operations.
- 0.1.1 Initial (working) version. Does everything it claims to do.
- 0.1.0 Initial version, doesn't work. See 0.1.1

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ianwremmel/grunt-customize-bootstrap/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

