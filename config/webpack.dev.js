var merge = require('webpack-merge');
// const webpack = require('webpack');
let config = require('./webpack.base.config');
const sourceMap = require('./webpack.entry');
config = merge(config, {
    plugins: sourceMap.plugin_html(),
    devServer: {
        contentBase: false,
        // host: "192.168.2.36",
        clientLogLevel: false,
        port: 8082,
    },
});


module.exports = config;