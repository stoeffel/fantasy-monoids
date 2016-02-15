'use strict';

const {adapters: {nodeunit: λ}} = require('fantasy-check');
const {identity} = require('fantasy-combinators');

const sʹ = require('fantasy-land/laws/setoid');

const {Ord} = require('../fantasy-monoids');

const Ordʹ = Ord((x, y) => x === y ? Ord.EQ: x < y ? Ord.LT: Ord.GT);


exports.setoid = {

    'reflexivity': λ.law(sʹ.reflexivity)(Ordʹ.of),
    'symmetry': λ.law(sʹ.symmetry)(Ordʹ.of),
    'transitivity': λ.law(sʹ.transitivity)(Ordʹ.of)
};
