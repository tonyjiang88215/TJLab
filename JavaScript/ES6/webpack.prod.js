var webpack = require('webpack');
module.exports = {
    //devtool : "source-map",
    entry: {
        entry : "./src/entry",
        react : ["react" , "react-dom"]
    },

    output: {
        path: './build',
        filename: "[name].js",
        chunkFilename : "[id].chunk.js"
    },
    resolve : {
      extensions : ['' , '.js' , '.es6']
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ["babel"], exclude: /node_modules/ },
            { test: /\.es6$/, loader: "babel-loader", exclude: /node_modules/ },
            { test: /\.jsx$/ , loader : "babel-loader" , exclude : /node_modules/},
            //指定css文件的加载器为 style!css
            {test : /\.css$/ , loader : 'style!css'},
            {test: /\.less$/ , loader: "style!css!less"}
        ]
    },
    plugins : [
        //去重
        new webpack.optimize.DedupePlugin(),
        //定义真正的启动模块
        new webpack.optimize.CommonsChunkPlugin("init.js"),

        //合并小于2048b大小的文件
        new webpack.optimize.MinChunkSizePlugin({minChunkSize : 2048}),
        //压缩JS
        new webpack.optimize.UglifyJsPlugin(),
        //文件头部注释
        new webpack.BannerPlugin("This is Banner Text")
    ]
};