const path = require('path');
var ROOT_PATH = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack')

const config = {
  entry: {
    vendor: 'vue',
    app: path.resolve(ROOT_PATH, 'src/index.js')
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'js/[name].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.sass|.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss', '.css', '.sass'],
    alias: {
      // vue不用render渲染 可放出
      // 'vue$': 'vue/dist/vue.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV == 'dev' ? path.resolve(ROOT_PATH, 'bin_dev/index.html') : path.resolve(ROOT_PATH, 'dist/index.html'),
      template: path.resolve(ROOT_PATH, 'src/index.html'),
      inject: 'body',
      minify: {
        removeComments: true,
        // collapseWhitespace: true,
        // removeAttributeQuotes: true
      },
      chunks: ['app', 'vendor']   // 这个模板对应上面那个节点
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: "js/[name].js",
      minChunks: 2
    })
  ]
}

module.exports = config;