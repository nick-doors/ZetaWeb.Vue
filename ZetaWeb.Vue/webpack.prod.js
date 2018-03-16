"use strict";
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    output: {
        filename: "./dist/zetaweb-vue.min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
};