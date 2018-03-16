/// <binding />
"use strict";
const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: "./src/main.js",
    plugins: [
        new WebpackNotifierPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    resolve: {
        alias: {
            'vue$': debug ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js'
        }
    },
    target: 'web',
    devtool: 'source-map'
};