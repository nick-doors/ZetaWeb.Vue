"use strict";
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    output: {
        filename: "./bundles/zetaweb-vue.min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};