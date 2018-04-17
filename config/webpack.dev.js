var merge = require('webpack-merge');
var config = require('./webpack.base.config.js');

const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config = merge(config, {
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    host: '192.168.2.36',
    contentBase: false,
    clientLogLevel: false,
    compress: true,
    port: 9000,
    open: true
  },
  plugins: [
    // css抽取
    new ExtractTextPlugin("css/[name].css"),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify('true'),
    })
  ]
});
console.log('test')
module.exports = config;