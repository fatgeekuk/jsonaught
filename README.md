# jsonaught
JSON recursive search library

If you have a large and deep JSON structure and you and you want to find something in it, this is the library for you.

## Example

Say you have an annoying JSON structure.

    var data = [
      {tag: 'td'},
      {tag: 'inner', children: [{tag: 'td'}]},
      {tag: 'other', children: [{tag: 'td'}]},
      {
        tag: 'outer',
        children1: [
          {tag: 'inner', children: [{tag: 'td', hit: 'first'}]}
        ],
        other: {tag: 'td'},
        another: {tag: 'inner', other: {tag: 'td', hit: 'second'}}
      }
    ]
    
And you want to find all the {tag: 'td'} elements that are somewhere within
an element that has {tag: 'inner'} which is itself somewhere inside an
element that has {tag: 'outer'}.

You can find these by defining a query and calling the library

    // ES6 format
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

    result = (new JSONaught(data)).search(...query);

Or, in good old ES5

    // ES5 format
    result = (new JSONaught(data)).search({
        tag: 'outer'
      },
      {
        tag: 'inner'
      },
      {
        tag: 'td'
      });

Either of these should return an array of references to the two elements of the data JSON that satisfy the query.
