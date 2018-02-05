var merge = require('webpack-merge');
let config = require('./webpack.base.config');
const sourceMap = require('./webpack.entry');

config = merge(config, {
  devtool: 'source-map',
  plugins: sourceMap.plugin_html()
});


module.exports = config;