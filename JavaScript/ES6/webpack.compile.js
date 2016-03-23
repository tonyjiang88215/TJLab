var webpack = require('webpack');
module.exports = {
    //devtool : "source-map",
    entry: {
        entry : "./src/entry",
        react : ["react" , "react-dom"]
    },

    output: {
        path: './compile',
        filename: "[name].js"
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
        new webpack.optimize.CommonsChunkPlugin("react" , "react.bundle.js"),
        //文件头部注释
        new webpack.BannerPlugin("This is Banner Text")
    ]
};