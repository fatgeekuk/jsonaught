// Import chai.
let expect = require('chai').expect,
  path = require('path');

// Import the Rectangle class.
let JSONaught = require(path.join(__dirname, '../src', 'jsonaught'));

// The fat arrow (=>) syntax is a new way to define
// functions in ES6. One feature that is different
// from the usual "function" keyword is that the scope
// is inherited from the parent, so there is no need to write
//
//   function() {
//     ...
//   }.bind(this)
//
// anymore. In this case we are not using "this" so the new
// syntax is just used for brevity.

describe('JSONaught', () => {
  let js0;
  let data;

  beforeEach(() => {
    data = {
      first: [
        {
          tag: 'td'
        },
        {},
        {}
      ],
      empty: []
    }

    js0 = new JSONaught(data);
  });

  describe('#match', () => {
    var result;

    describe("when they don't match", () => {
      var node = {};
      var query = {
        tag: 'ul'
      };

      beforeEach(() => {
        result = js0.match(node, query)
      });

      it('did not match', () => {
        expect(result).to.equal(false);
      });
    });

    describe('when they do', () => {
      var node = {
        tag: 'ul'
      };
      var query = {
        tag: 'ul'
      };

      beforeEach(() => {
        result = js0.match(node, query)
      });

      it('did match', () => {
        expect(result).to.equal(true);
      });

    });
  });

  describe('#traverse', () => {
    var result;
    var nodes = [];

    beforeEach(() => {
      result = js0.traverse(data, (element) => {
        nodes[nodes.length] = element;
      });
    });

    it('has visited every node', () => {
      console.log('nodes', JSON.stringify(nodes));
      expect(nodes.length).to.eq(7)
    });
  });

  describe('#search', () => {
    var result;

    describe('with empty query', () => {
      var query = [
      ];

      beforeEach(() => {
        result = js0.search(...query);
      })

      it('returns an array', () => {
        expect(result.length).to.equal(0)
      });
    });

    describe('with valid query', () => {
      var query = [
        {
          tag: 'td'
        }
      ];

      beforeEach(() => {
        result = js0.search(...query);
      })

      it('returns an array', () => {
        expect(result).to.be.a('Array');
      });

      it('with one element', () => {
        expect(result.length).to.equal(1);
      });

      describe('looking at the first result', () => {
        var firstResult;

        beforeEach(() => {
          firstResult = result[0];
        });

        it('is an object', () => {
          expect(firstResult).to.be.a('object');
        });
      });
    });

    describe('with valid  COMPLEX query', () => {
      var data = [
        {tag: 'td'},
        {tag: 'inner', children: [{tag: 'td'}]},
        {tag: 'other', children: [{tag: 'td'}]},
        {
          tag: 'outer',
          children1: [
            {tag: 'inner', children: [{tag: 'td', hit: 'first'}]} // hit one
          ],
          other: {tag: 'td'},
          another: {tag: 'inner', other: {tag: 'td', hit: 'second'}} // hit two
        }
      ];

      var query = [
        {
          tag: 'outer'
        },
        {
          tag: 'inner'
        },
        {
          tag: 'td'
        }
      ];

      beforeEach(() => {
        js0 = new JSONaught(data);
        result = js0.search(...query);
      });

      it('found two hits', () => {
        expect(result.length).to.eq(2);
      });

      describe('the first hit', () => {
        var first;

        beforeEach(() => {
          first = result[0];
        });

        it('is the first', () => {
          expect(first.hit).to.eq('first');
        });
      });

      describe('the second hit', () => {
        var second;

        beforeEach(() => {
          second = result[1];
        });

        it('is the second', () => {
          expect(second.hit).to.eq('second');
        });
      });
    });
  });
});
