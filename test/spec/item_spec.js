/* global beforeEach, afterEach, describe, expect, it, spyOn, xdescribe, xit, jasmine */
describe('item', function() {
  'use strict';

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'http://localhost:9876/base/test/fixtures';
    loadFixtures('index.html');
  });

  it('use AbItem namespace', function () {
    expect(window.AbItem).toBeDefined();
  });

  it('changeItem', function () {
    var doc = window.document,
        myItems,
        item = window.AbItem;

    item.changeItem('b');

    var myItems = doc.getElementById('myItems');
    var childNodes = myItems.children,
        len = myItems.childElementCount;

    for ( var i = 0; i < len; i += 1 ) {
      expect(childNodes[i].getAttribute('class')).toBe('b');
      expect(childNodes[i].innerHTML[0]).toBe('b');
    }
  });
});

