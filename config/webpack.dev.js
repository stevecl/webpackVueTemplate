var merge = require('webpack-merge');
var config = require('./webpack.base.config.js');

// const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config = merge(config, {
    devtool: 'source-map',
    devServer: {
        // contentBase: path.join(__dirname, "bin_dev"),
        host: '192.168.10.172',
        contentBase: false,
        clientLogLevel: false,
        compress: true,
        port: 9000,
        open: true
    },
    plugins: [
        // css抽取
        new ExtractTextPlugin("css/[name].css"),
        // 设置全局变量
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify('false'),
        })
    ]
});

module.exports = config;