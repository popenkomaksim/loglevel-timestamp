const {expect} = require('chai');
const {describe, it} = require('mocha');

const loglevel = require('loglevel');
const prefixer = require('../src');

describe('Loglevel timestamp', () => {
  it('should accept a loglevel instance and options', () => {
    try {
      prefixer(loglevel, {
        shouldTimestamp: true,
        shouldLevel: true,
        prefixStart: '[',
        prefixEnd: ']',
        prefixes: [function() {
          return 'this is a function';
        }]
      });
    } catch (err) {
      expect(err).to.be.an('undefined');
    }
  });

  it('should throw an error on wrong loglevel instance', () => {
    try {
      prefixer(undefined, {
        shouldTimestamp: true,
        shouldLevel: true,
        prefixStart: '[',
        prefixEnd: ']',
        prefixes: [function() {
          return 'this is a function';
        }]
      });
    } catch (err) {
      expect(err).not.to.be.an('undefined');
    }
  });

  it('should throw an error on wrong prefixes configuration', () => {
    try {
      prefixer(loglevel, {
        shouldTimestamp: true,
        shouldLevel: true,
        prefixStart: '[',
        prefixEnd: ']',
        prefixes: 'hello'
      });
    } catch (err) {
      expect(err).not.to.be.an('undefined');
    }
  });

  it('should instance without options', () => {
    try {
      prefixer(loglevel);
    } catch (err) {
      expect(err).to.be.an('undefined');
    }
  });
});
