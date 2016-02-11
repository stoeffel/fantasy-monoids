'use strict';

const {tagged} = require('daggy');
const {empty, of, concat, equals} = require('fantasy-land');
const {compare, LT, isOrd} = require('./ord');

const Min = tagged('x');

Min[of] = x => Min(x);
Min[empty] = () => Min(Number.MIN_VALUE);

Min.prototype[equals] = function(y) {
    if (isOrd(this.x)) return this.x[equals](y);
    return this.x === y.x;
};
Min.prototype[concat] = function(y) {
    if (isOrd(this.x)) return Min(this.x[compare](y.x) === LT ? this.x : y.x);
    return Min(this.x < y.x ? this.x : y.x);
};

module.exports = Min;
