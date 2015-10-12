/**
 * Created by tonyjiang on 15/3/3.
 * 全局公共存储对象
 */
define(function () {

    var data = {};

    return {
        set : function(key , value){
            data[key] = value;
        },

        //默认返回指针,最后一个参数传true则返回clone
        get : function(key , callback){
            var rs = null;
            if(data[key]){

                rs = data[key];
            }
            if(callback){
                callback(rs);
            }else{
                return rs;
            }
        },

        remove : function(key){
            delete data[key];
        },

        exist : function(key){
            return !(data[key] == undefined || data[key] == null);
        }
    }

});
