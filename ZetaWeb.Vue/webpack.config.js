/// <binding />
"use strict";
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const debug = process.env.NODE_ENV !== 'production';
const partial = require(debug ? './webpack.dev.js' : "./webpack.prod.js");

module.exports = merge(common, partial);