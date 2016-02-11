'use strict';

const {tagged} = require('daggy');
const {empty, of, concat, equals} = require('fantasy-land');

const Ord = compare => {

    const _Ord = tagged('x');

    _Ord[of] = _Ord;
    
    _Ord.prototype.compare = function(y) {
      const res =  compare(this.x, y.x);
      return res;
    };
    _Ord.prototype.min = function(y) {
        return _Ord(compare(this.x, y.x) === Ord.LT? this.x: y.x);
    };
    _Ord.prototype.max = function(y) {
        return _Ord(compare(this.x, y.x) === Ord.GT? this.x: y.x);
    };
    _Ord.prototype[equals] = function(y) {
        return compare(this.x, y.x) === Ord.EQ;
    };
    _Ord.prototype.lt = function(y) {
        return compare(this.x, y.x) === Ord.LT;
    };
    _Ord.prototype.gt = function(y) {
        return compare(this.x, y.x) === Ord.GT;
    };

    return _Ord;
};

Ord.isOrd = x => typeof x.compare === 'function';
Ord.EQ = 0;
Ord.GT = 1;
Ord.LT = -1;
Ord.compare = 'compare';

module.exports = Ord;
