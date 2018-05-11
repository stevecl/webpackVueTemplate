var merge = require('webpack-merge');
var config = require('./webpack.base.config.js');
let ROOT_PATH = process.cwd();

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

config = merge(config, {
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: ''
  },
  devtool: false,
  plugins: [
    // css抽取
    new ExtractTextPlugin("css/[name].[hash:8].css"),
    // 设置全局变量
    new webpack.DefinePlugin({
      'PRODUCTION': JSON.stringify('true'),
    }),
    // 清除dist目录
    new CleanWebpackPlugin(['dist'], ROOT_PATH),
    // 压缩
    new UglifyJSPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    })
  ],
});

module.exports = config;