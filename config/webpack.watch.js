const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var merge = require('webpack-merge');
var config = require('./webpack.base.config.js');
let ROOT_PATH = process.cwd();

config = merge(config, {
  output: {
    path: path.resolve(ROOT_PATH, 'bin_dev'),
  },
  devtool: 'source-map',
  plugins: [
    // css抽取
    new ExtractTextPlugin("css/[name].css"),
    // 设置全局变量
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify('false'),
    })
  ]
});

// console.log('PRODUCTION:',PRODUCTION)
module.exports = config;