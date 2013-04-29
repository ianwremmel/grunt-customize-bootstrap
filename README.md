# grunt-customize-bootstrap

Grunt plugin which generates bootstrap.less during the build processing, mixing in any detected local overrides.

## Dependencies

1. Bower - for now, grunt-customize-bootstrap expects that you retrieved the bootstrap source using bower.

## Grunt Config

```javascript
customizeBootstrap: {
	options: {
		responsive: false,
		components: 'components',
		src: 'src/styles/bootstrap',
		dest: 'build'
	}
}

### responsive (optional)

Indicates whether or not to build the responsive stylesheets

### components (required)

Location of the bower `components` directory.

### src (required)

Location of the overridden bootstrap files

### dest (required)

Location to place the generated bootstrap.less