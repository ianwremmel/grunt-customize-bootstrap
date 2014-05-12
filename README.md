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

### Overview
In your project's Gruntfile, add a section named `customize-bootstrap` to the data object passed into `grunt.initConfig()`.

Note: `customize_bootstrap` or `customizeBootstrap` are also valid task names.

```JavaScript
grunt.initConfig({
  'customize-bootstrap': {
    yourTarget: {
      options: {
        components: 'components',
        src: 'src/styles/bootstrap/',
        dest: 'src/styles/',
      }
    },
  },
})
```

### Options


#### options.components

Type: `String`  
Default: `bower_components`  

Location of the `bower_components` directory.

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
- 0.1.5 Code cleanup; removed features specific to Bootstrap 2.x.
- 0.1.2 Added support for a local less file. Rewrote customize task to use grunt file api, synchronous operations.
- 0.1.1 Initial (working) version. Does everything it claims to do.
- 0.1.0 Initial version, doesn't work. See 0.1.1

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ianwremmel/grunt-customize-bootstrap/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

