function prefixer(log, options) {
  var opts = options || {};
  var originalFactory = log.methodFactory;
  var level = log.getLevel();

  var shouldTimestamp = true;

  if (opts.shouldTimestamp !== undefined) {
    shouldTimestamp = opts.shouldTimestamp;
  }

  log.methodFactory = function(methodName, logLevel, loggerName) {
    var rawMethod = originalFactory(methodName, logLevel);

    return function () {
      var messages = [];
      var timestamp = new Date().toISOString();
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

      rawMethod.apply(undefined, messages);
    };
  };

  log.setLevel(level);
}

if (typeof module === 'object' && module.exports) {
  module.exports = prefixer;
}
