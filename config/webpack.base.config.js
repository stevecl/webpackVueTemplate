const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

// var ROOT_PATH = path.resolve(__dirname);
var ROOT_PATH = process.cwd();

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const sourceMap = require('./webpack.entry');

const config = {
    entry: Object.assign(sourceMap.entries(), {
        vendors: ['vue']
    }),
    output: {
        path: path.resolve(ROOT_PATH, 'bin_dev'),
        filename: 'entry/[name].js',
        chunkFilename: "modules/[id].js",
        publicPath: '/'
    },
    devtool: false,
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,

        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.sass|.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!sass-loader'
            }),
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=1&name=images/[name][hash:8].[ext]'
        }
        ]
    },
    resolve: {
        extensions: ['.css', '.sass', '.js', '.vue', '.scss'],
        alias: {
            "pages": path.resolve(ROOT_PATH, 'src/view/page'),
            "asssets": path.resolve(ROOT_PATH, 'src/assets')
        }
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: "entry/[name].js",
            minChunks: 2
        })
    ]
};

module.exports = config;