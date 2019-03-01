var through = require('through2'),
  crypto = require('crypto'),
  PluginError = require('plugin-error');

module.exports = function (param) {
  'use strict';

  // if necessary check for required param(s), e.g. options hash, etc.
  if (!param) {
    throw new PluginError('gulp-encrypt', 'No param supplied');
  }
  else if (!param.key) {
    throw new PluginError('gulp-encrypt', 'No key param supplied');
  } else if (!param.algo) {
    throw new PluginError('gulp-encrypt', 'No algo param supplied');
  }
  else if (!param.encoding) {
    throw new PluginError('gulp-encrypt', 'No encoding object supplied');
  }
  else if (!param.encoding.input) {
    throw new PluginError('gulp-encrypt', 'No encoding.input param supplied');
  }
  else if (!param.encoding.output) {
    throw new PluginError('gulp-encrypt', 'No encoding.output param supplied');
  }
  else if (!param.iv) {
    throw new PluginError('gulp-encrypt', 'No iv param supplied');
  }

  // see 'Writing a plugin'
  // https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
  function gulpEncrypt(file, enc, callback) {
    /*jshint validthis:true*/

    // Do nothing if no contents
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {

      // http://nodejs.org/api/stream.html
      // http://nodejs.org/api/child_process.html
      // https://github.com/dominictarr/event-stream

      // accepting streams is optional
      this.emit('error',
        new PluginError('gulp-encrypt', 'Stream content is not supported'));
      return callback();
    }

    // check if file.contents is a `Buffer`
    if (file.isBuffer()) {

      // manipulate buffer in some way
      // http://nodejs.org/api/buffer.html
      var contents = file.contents.toString();
      var key = param.key;

      if (!param.decrypt) {
        var cipher = crypto.createCipheriv(param.algo, key, param.iv);
        contents = cipher.update(contents, param.encoding.input, param.encoding.output);
        contents += cipher.final(param.encoding.output)
      }
      else {
        var decipher = crypto.createDecipheriv(param.algo, key, param.iv);
        contents = decipher.update(contents, param.encoding.output, param.encoding.input);
        contents += decipher.final(param.encoding.input);
      }
      file.contents = new Buffer(contents);

      this.push(file);
    }
    return callback();
  }

  return through.obj(gulpEncrypt);
};
