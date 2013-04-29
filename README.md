# grunt-customize-bootstrap

> Plugin to aid in overriding bootstrap less files without altering core files.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-customize-bootstrap --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-customize-bootstrap');
```

## The "customize_bootstrap" task

### Overview
In your project's Gruntfile, add a section named `customize_bootstrap` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  customize_bootstrap: {
    your_target: {
      options: {
        responsive: false,
        components: 'components',
        src: 'src/bootstrap',
        dest: '.tmp'
      }
    },
  },
})
```

### Options

#### options.responsive
Type: `Boolean`
Default value: `false`

Indicates whether or not to build the responsive stylesheets

#### options.components
Type: `String`
Default value: ``

Location of the bower `components` directory.

#### options.src
Type: `String`
Default value: ``

Location of the overridden bootstrap files

#### options.dest
Type: `String`
Default value: ``

Location to place the generated bootstrap.less (and possibly responsive.less)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.1 Initial (working) version. Does everything it claims to do.
0.1.0 Initial version, doesn't work. See 0.1.1