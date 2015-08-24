import 'core-js/shim';
import _ from 'lodash';

export default class JSONaught {

  constructor( jsonChunk ) {
    this.jsonChunk = jsonChunk;
  }

  search(query, ...rest){
    var answer = new Array();

    this.subSearch((item) => {
      answer[answer.length] = item
    }, this.jsonChunk, query, ...rest);

    return answer;
  }

  subSearch(callback, chunk, query, ...rest){
    if (query){
      if (rest.length > 0){
        // we have a tail, so, this is a qualifier, not
        // ultimately what we are looking for.
        this.traverse(chunk, (item) => {
          if (_.isObject(item) && !_.isArray(item)){
            if (this.match(item, query)){
              _.forEach(item, (child) => {
                this.subSearch(callback, child, ...rest);
              })
            }
          }
        });
      } else {
        // it IS what we are looking for
        this.traverse(chunk, (item) => {
          if (_.isObject(item) && !_.isArray(item)){
            if (this.match(item, query)){
              callback(item);
            };
          };
        });
      };
    };
  };

  traverse(node, callback){
    callback(node);
    if (_.isObject(node) || _.isArray(node)){
      _.forEach(node, (child) => {
        this.traverse(child, callback);
      });
    };
  };

  match(node, query) {
    var answer = true;
    for(var key in query){
      if (query[key] != node[key]) {
        answer = false;
      };
    };
    return answer;
  };
};
