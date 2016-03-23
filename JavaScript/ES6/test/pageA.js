/**
 * Created by tonyjiang on 16/1/26.
 */

//require.ensure(['./a' , './b' , './c' , './third-lib'] , function(require){
    var a = require('./a');
    var b = require('./b');
    var c = require('./c');
    //require(['./a' , './b' , './c'] , function(a,b,c){
        console.log("load a from pageA :" , a);
        var pageA = {
            name : 'pageA'
        };
        console.log('this is pageA' , pageA);
        module.exports = pageA;
    //});



//} , 'pageAB');

