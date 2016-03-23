var webpack = require('webpack');
var px2rem = require('postcss-px2rem');

module.exports = {
    devtool : "source-map",
    entry: {
        entry : [
            "webpack-dev-server/client?http://localhost:3000",
            "webpack/hot/only-dev-server",
            "./src/entry"]
    },
    output: {
        path: __dirname,
        filename: "[name].js"
    },
    resolve : {
        extensions : ['' , '.js' , '.es6']
    },
    module: {
        loaders: [
            { test: /\.js$/, loader : "babel", exclude: /node_modules/ },
            { test: /\.es6$/, loader : "babel-loader", exclude: /node_modules/ },
            { test: /\.jsx$/ , loader : 'react-hot!babel-loader' , exclude : /node_modules/},
            //指定css文件的加载器为 style!css
            {test : /\.css$/ , loader : 'style-loader!css-loader!postcss-loader'},
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ],
        postcss : function(){
            return [px2rem({remUnit : 36})];
        }
    },
    plugins : [
        //去重
        new webpack.optimize.DedupePlugin(),
        //热加载
        new webpack.HotModuleReplacementPlugin()
    ]
};