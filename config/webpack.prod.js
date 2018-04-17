var merge = require('webpack-merge');
var config = require('./webpack.base.config.js');
let ROOT_PATH = process.cwd();

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

config = merge(config, {
  output: {
    path: path.resolve(ROOT_PATH,'dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: ''
  },
  devtool: false,
  plugins:[
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': '"production"',
    // }),
    new CleanWebpackPlugin(['dist'], ROOT_PATH),
    // css抽取
    new ExtractTextPlugin("css/[name].[hash:8].css"),
    // 压缩
    new UglifyJSPlugin()
  ]
});

module.exports = config;