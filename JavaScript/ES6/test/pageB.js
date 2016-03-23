/**
 * Created by tonyjiang on 16/1/26.
 */
//var b = require('./b');
//var c = require('./c');
//var d = require('./d');
require.ensure(['./b' , './c' , './d'] , function(require){
    require(['./b' , './c' , './d'] , function(b , c , d){
        module.exports = {
            name : 'pageB'
        }
    });

} , 'pageAB');

