const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var sourceMap = {
    entries : function () {
        var entryJSs = glob.sync('./src/entry/*.js');
        var map = {};
        for (var i = 0; i < entryJSs.length; i++) {
            var filePath = entryJSs[i];
            var fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
            map[fileName] = filePath;
        }
        return map;
    },
    plugin_html : function () {
        var entryHtml = glob.sync('./src/entry/*.html');
        var plus = [];
        var entriesFiles = this.entries();
        for (var i = 0; i < entryHtml.length; i++) {
            var filePath = entryHtml[i];
            var fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
            var conf = {
                template: filePath, //为什么'html!path'=='path+.html'
                filename: 'html/'+fileName + '.html',
                // minify: {
                //     removeComments: true,
                //     collapseWhitespace: true,
                //     removeAttributeQuotes: true
                // }
            }
            //添加同名entry文件需引用模块
            if (fileName in entriesFiles) {
                conf.inject = 'body';
                conf.chunks = ["vendors", fileName];
            }
            //跨页面引用，如pageA,pageB 共同引用了common.js，那么可以在这单独处理
            //if(pageA|pageB.test(filename)) conf.chunks.splice(1,0,'common')
            plus.push(new HtmlWebpackPlugin(conf));
        }
        return plus;
    }
}
module.exports = sourceMap;