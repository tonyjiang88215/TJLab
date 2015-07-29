/**
 * Created by tonyjiang on 14/12/25.
 */
var util = {

    hitch : function(scope , method){
        return function(){
            return method.apply(scope , arguments);
        }
    },

    clone : function(src){
        var target = {};
        for(var i in src){
            target[i] = src[i];
        }
        return target;
    },

    mixin : function(){
        var target = arguments[0];

        for(var i = 1, len = arguments.length ; i < len ; i++){

            var src = arguments[i];

            for(var property in src){
                if(src[property] === null || src[property] === undefined ){
                    //nothing
                }else if(typeof src[property] == 'object'){
                    //target[property] = this.clone(src[property])
                    this.mixin(target[property],src[property]);
                }else if(typeof src[property] == 'function'){
                    target[property] = this.hitch(target , src[property]);
                }else{
                    target[property] = src[property];
                }
            }
        }

        return target;

    }

};

module.exports = util;