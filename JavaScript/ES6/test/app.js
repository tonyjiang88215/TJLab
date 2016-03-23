/**
 * Created by tonyjiang on 16/1/26.
 */
require.ensure('./pageA' , function(require){
    var pageA = require('./pageA');
    console.log('this is app');
    console.log("get pageA from app : " , pageA);
} , 'pageA');
//require.ensure(['./pageA','./pageB' , './third-lib']  , function(require){

    //require(['./pageA','./pageB' , './third-lib'] , function(pageA , pageB){

    //});

//} , 'page');