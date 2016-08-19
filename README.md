loglevel-timestamp
===================

Prepends a timestamp to your loglevel messages with some extra ✨.

[![npm version](https://badge.fury.io/js/loglevel-timestamp.svg)](https://badge.fury.io/js/loglevel-timestamp)

## Example

This can be used in node or in browser (see [browser support](#)).

```JavaScript
prefixer(log, {
  shouldLevel: true,
  prefixStart: '[',
  prefixEnd: ']'
});

log.info('App started');

// [ 2016-08-19T17:31:00.230Z INFO ] App started
```

## Options

* `shouldTimestamp`

  `Boolean` - Default: `true`

  Use this to control if timestamp appears.

---------------------------------------------

* `shouldLevel`

  'Boolean' - Default: 'false'

  Use this to define if log level should be displayed.

  Example:
  ```
    2016-08-19T17:31:00.230Z INFO App started
  ```

---------------------------------------------

* `prefixStart`

  `String` - Default: none

  This gets appended before the prefix.

---------------------------------------------

* `prefixEnd`

  `String` - Default: none

  This gets appended after the prefix.

---------------------------------------------

* `prefixes`

  `Array` - Default: none

  This are items that are displayed after the timestamp and log level. You can use functions here.

## Todo

- [ ] Browser tests
- [ ] Node tests
- [ ] SemaphoreCI
- [ ] Code climate
- [ ] User defined functions with custom context
- [ ] Reordering built-in prefixers in log
