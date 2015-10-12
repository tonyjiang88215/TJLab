/**
 * Created by tonyjiang on 15/3/4.
 */
define([
    'jquery'
], function ($) {

    var ajaxError = function(data){
        if ((data.status && data.status == '401') || (data.statusText && data.statusText == 'No Transport')) {
            console.log(data);
            var currentUrl = window.location.href;
            window.location.href = currentUrl;
            return;
        }
        if(data.errorMessage){
            console.log(data.errorMessage);
        }else{
            console.log('网络失败,请稍后再试');
        }
    };

    $.ajaxSetup({
        error: ajaxError
    });

    var api = {
    };

    return {
        xhr: {

            path : api,

            get: function (key, data, success, error) {
                var url = api[key];
                if(!url){
                    return false;
                }

                $.ajax({
                    url: url,
                    type: 'GET',
                    data: data,
                    dataType: 'json',
                    success: function(data){
                        if(data.result){
                            success(data);
                        }else{
                            error ? error(data) : ajaxError(data);
                        }
                    },
                    error: error
                })
            },

            post: function (key, data, success, error) {
                var url = api[key];
                if(!url){
                    return false;
                }

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    success: function(data){
                        if(data.result){
                            success(data);
                        }else{
                            error ? error(data) : ajaxError(data);
                        }
                    },
                    error: error
                })
            }
        },

        cookie:{
            get:function(name){
                var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
                if(arr != null) return unescape(arr[2]); return null;
            },
            set:function(name,value,sec){
                //默认保持30天
                if(!sec) sec=30*24*3600;
                var exp = new Date();
                exp.setTime(exp.getTime() +sec*1000);
                document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
            },
            remove:function(name){
                var exp = new Date(1970,1,1);
                document.cookie = name + "="+ escape ("") + ";expires=" + exp.toGMTString();
            }
        },

        isEmpty: function(v, allowEmptyString){
            if ((typeof v === 'undefined') || (v === null) || (!allowEmptyString ? v === '' : false) ||
                ($mObj.isArray(v) && v.length === 0)) {
                return true;
            }
            else if ($mObj.isObject(v)) {
                for (var key in v) {
                    if (Object.prototype.hasOwnProperty.call(v, key)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },

        getWindowSize : function(){

            var size = {
                width : 0,
                height : 0
            };

            // 获取窗口宽度
            if (window.innerWidth)
                size.width = window.innerWidth;
            else if ((document.body) && (document.body.clientWidth))
                size.width = document.body.clientWidth;
            // 获取窗口高度
            if (window.innerHeight)
                size.height = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))
                size.height = document.body.clientHeight;
            // 通过深入 Document 内部对 body 进行检测，获取窗口大小
            if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
            {
                size.height = document.documentElement.clientHeight;
                size.width = document.documentElement.clientWidth;
            }

            return size;

        }

    };
});