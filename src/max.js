'use strict';

const {tagged} = require('daggy');
const {empty, of, concat, equals} = require('fantasy-land');
const {compare, GT, isOrd} = require('./ord');

const Max = tagged('x');

Max[of] = x => Max(x);
Max[empty] = () => Max(Number.MAX_VALUE);

Max.prototype[equals] = function(y) {
    if (isOrd(this.x)) return this.x[equals](y);
    return this.x === y.x;
};
Max.prototype[concat] = function(y) {
    if (isOrd(this.x)) return Max(this.x[compare](y.x) === GT ? this.x: y.x);
    return Max(this.x > y.x ? this.x : y.x);
};

module.exports = Max;
