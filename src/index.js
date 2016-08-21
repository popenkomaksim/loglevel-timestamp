/* eslint strict: ["error", "function"] */

function prefixer(log, options) {
  'use strict';

  function _checkOptions(params) {
    if (params.prefixes && !(params.prefixes instanceof Array)) {
      throw new Error('Prefixes should be an array');
    }
  }

  if (options) {
    _checkOptions(options);
  }

  var opts = options || {};
  var originalFactory = log.methodFactory;
  var level = log.getLevel();

  var timestamp = new Date().toISOString();
  var shouldTimestamp = true;

  if (typeof opts.shouldTimestamp !== 'undefined') {
    shouldTimestamp = opts.shouldTimestamp;
  }

  log.methodFactory = function(methodName, logLevel) {
    var rawMethod = originalFactory(methodName, logLevel);

    return function() {
      var messages = [];
      var args = Array.prototype.slice.call(arguments);

      if (opts.prefixStart) {
        messages.push(opts.prefixStart);
      }

      if (shouldTimestamp) {
        messages.push(timestamp);
      }

      if (opts.shouldLevel) {
        messages.push(methodName.toUpperCase());
      }

      if (opts.prefixes && opts.prefixes instanceof Array) {
        opts.prefixes.forEach(function(prefix) {
          if (typeof prefix === 'function') {
            messages.push(prefix());
          } else {
            messages.push(prefix);
          }
        });
      }

      if (opts.prefixEnd) {
        messages.push(opts.prefixEnd);
      }

      args.forEach(function(argument) {
        messages.push(argument);
      });

      rawMethod.apply(null, messages);
    };
  };

  log.setLevel(level);
}

if (typeof module === 'object' && module.exports) {
  module.exports = prefixer;
}
