require('mocha-sinon');
var sinon = require('sinon');
var expect = require('chai').expect;
var ls = require('../ls');
var fs = require('fs');

describe('The ls() method', function() {
  it('Returns katalog for katalog', function() {
    let spy = sinon.spy(console, 'log');
    ls.ls('test');
    expect(spy.calledWith("folder"));
    spy.restore();
    // expect(ls.ls('test')).to.equal("folder");
  });

  it('Returns file for file', function() {
    let spy = sinon.spy(console, 'log');
    ls.ls('test\\test.js');
    expect(spy.calledWith("plik"));
    spy.restore();
  });
});
