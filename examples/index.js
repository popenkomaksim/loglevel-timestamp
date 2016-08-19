const logger = require('loglevel');
const prefixer = require('../');

var options = {
  shouldTimestamp: true,
  prefixStart: '[',
  prefixEnd: ']',
  shouldLevel: true,
  prefixes: [function() {
    return 'this is a function';
  }]
};

prefixer(logger, options);

logger.setLevel(0);

var msg = 'Example message';
logger.trace(msg)
logger.debug(msg)
logger.info(msg)
logger.warn(msg)
logger.error(msg)
