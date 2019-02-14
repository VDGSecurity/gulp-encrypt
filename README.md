# gulp-encrypt [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> gulp-encrypt plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-encrypt` as a development dependency:

```shell
npm install --save-dev https://github.com/VDGSecurity/gulp-encrypt.git#master
```

Then, add it to your `gulpfile.js`:

```javascript
var encrypt = require("gulp-encrypt");

gulp.src("./src/*.json")
	.pipe(encrypt({
		key: process.env.secretKey,
		decrypt: false || true,
		algo: 'aes-128-ctr',
		encoding: {
		  input: 'utf8',
		  output: 'hex'
		},
		iv: 'm1t1WHX5XiMaBtAg'
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### gulp-encrypt(options)

#### options.key
Type: `String`  
Required

#### options.decrypt
Type: `Boolean`  
Default: `false`

#### options.algo
Type: `String`  
Ex: `aes-128-ctr`  
Required

#### options.encoding.input
Type: `String`  
Ex: `utf8`  
Required

#### options.encoding.output
Type: `String`  
Ex: `hex`  
Required

#### options.iv
Type: `String`  
Ex: `m1t1WHX5XiMaBtAg`  
Required

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-encrypt
[npm-image]: https://badge.fury.io/js/gulp-encrypt.png

[travis-url]: http://travis-ci.org/charliedowler/gulp-encrypt
[travis-image]: https://secure.travis-ci.org/charliedowler/gulp-encrypt.png?branch=master

[depstat-url]: https://david-dm.org/charliedowler/gulp-encrypt
[depstat-image]: https://david-dm.org/charliedowler/gulp-encrypt.png
