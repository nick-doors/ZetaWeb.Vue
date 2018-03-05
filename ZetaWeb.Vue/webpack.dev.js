﻿/// <binding />
"use strict";
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        filename: "./bundles/zetaweb-vue.js"
    }
});