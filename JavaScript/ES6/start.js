/**
 * Created by tonyjiang on 16/1/20.
 */
var exec = require('child_process').exec;

//var compileCMD = 'webpack --config webpack.compile.js --progress --colors --watch';
var prodCMD = 'webpack --config webpack.prod.js --progress --colors --watch';
var buildCMD = 'webpack-dev-server --config webpack.dev.js --progress --color';

var lastOutput = 0;

var prod = exec(prodCMD , function(error , stdout , stderr){
   console.log(stdout);
});

prod.stdout.on('data'  , function(data){
    if(lastOutput != 'compile'){
        console.log('编译执行中');
        console.log('--------------------------');
    }
    lastOutput = 'compile';
    console.log(data) ;
});

prod.on('exit' , function(code){
    console.log('compile exit , code : ' , code );
});

var build = exec(buildCMD , function(error , stdout , stderr){console.log(stdout)});

build.stdout.on('data' , function(data){
    if(lastOutput != 'build'){
        console.log('构建执行中');
        console.log('--------------------------');
    }
    lastOutput = 'build';
    console.log(data) ;
});

build.on('exit' , function(code){
    console.log('build exit , code : ' , code );
});