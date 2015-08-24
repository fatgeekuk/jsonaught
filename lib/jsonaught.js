"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

require("core-js/shim");

var _ = _interopRequire(require("lodash"));

var JSONaught = (function () {
  function JSONaught(jsonChunk) {
    _classCallCheck(this, JSONaught);

    this.jsonChunk = jsonChunk;
  }

  _createClass(JSONaught, {
    search: {
      value: function search(query) {
        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        var answer = new Array();

        this.subSearch.apply(this, [function (item) {
          answer[answer.length] = item;
        }, this.jsonChunk, query].concat(rest));

        return answer;
      }
    },
    subSearch: {
      value: function subSearch(callback, chunk, query) {
        var _this = this;

        for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
          rest[_key - 3] = arguments[_key];
        }

        if (query) {
          if (rest.length > 0) {
            // we have a tail, so, this is a qualifier, not
            // ultimately what we are looking for.
            this.traverse(chunk, function (item) {
              if (_.isObject(item) && !_.isArray(item)) {
                if (_this.match(item, query)) {
                  _.forEach(item, function (child) {
                    _this.subSearch.apply(_this, [callback, child].concat(rest));
                  });
                }
              }
            });
          } else {
            // it IS what we are looking for
            this.traverse(chunk, function (item) {
              if (_.isObject(item) && !_.isArray(item)) {
                if (_this.match(item, query)) {
                  callback(item);
                };
              };
            });
          };
        };
      }
    },
    traverse: {
      value: function traverse(node, callback) {
        var _this = this;

        callback(node);
        if (_.isObject(node) || _.isArray(node)) {
          _.forEach(node, function (child) {
            _this.traverse(child, callback);
          });
        };
      }
    },
    match: {
      value: function match(node, query) {
        var answer = true;
        for (var key in query) {
          if (query[key] != node[key]) {
            answer = false;
          };
        };
        return answer;
      }
    }
  });

  return JSONaught;
})();

module.exports = JSONaught;