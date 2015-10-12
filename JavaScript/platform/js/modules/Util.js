/**
 * Created by tonyjiang on 15/2/8.
 */
define([],function(map){

    var _cache = {};

    var Util = {
        //切换作用域
        hitch : function(scope , method){
            return function(){
                return method.apply(scope , arguments);
            }
        },

        //暂时没用
        clone : function(src){
            var target = {};
            for(var i in src){
                target[i] = src[i];
            }
            return target;
        },

        //混入
        mixin : function(){
            var target = arguments[0];

            for(var i = 1, len = arguments.length ; i < len ; i++){

                var src = arguments[i];

                for(var property in src){
                    if(typeof src[property] == 'object'){

                        target[property] = this.clone(src[property])

                    }else if(typeof src[property] == 'function'){

                        target[property] = this.hitch(target , src[property]);
                    }else{
                        target[property] = src[property];
                    }
                }
            }

            return target;

        },

        getQueryString : function(key){
            if(!_cache['queryString']){
                _cache['queryString'] = {};
                var _t = window.location.search.replace('?','').split('&');
                for(var i = 0, len = _t.length ; i < len ; i++){
                    var _e = _t[i].split('=');
                    _cache['queryString'][_e[0]] = _e[1];
                }
            }
            return _cache['queryString'][key];

        },
        escape: function (a) {
            a = a ? a : '';
            return a.replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;").replace("/\x26/g", "\x26amp;").replace(/"/g, "\x26quot;");
        },

        unescape: function (a) {
            a = a ? a : '';
            return a.replace(/&lt;/g,
                "\x3c").replace(/&gt;/g, "\x3e").replace(/&amp;/g, "\x26").replace(/&quot;/g, '"');
        },

        indexOf : function(arr , key){
            //if(Array.prototype.indexOf){
            //    return Array.prototype.indexOf.call(arr , key);
            //}else{
                for(var i = 0, len = arr.length ; i < len ; i++){
                    if(arr[i] == key){
                        return i;
                    }
                }
                return -1;
            //}
        },

        getPageParams : function(){
            var i,ilen,strs,keyName,keyValue,
                params={},
                path = window.location.pathname,
                url = window.location.href;
            if(url.indexOf("?")>-1){
                var index = url.indexOf("?");
                strs = url.substring(index + 1);
                strs=strs.split("&");
                ilen=strs.length;
                for(i=0;i<ilen;i++){
                    var indexEqual = strs[i].indexOf('=');
                    keyName = strs[i].substring(0, indexEqual);
                    keyValue = strs[i].substring(indexEqual + 1) || "";
                    if(keyName=="callback") keyValue=decodeURIComponent(keyValue);
                    params[keyName]=keyValue;
                }
            }
            //console.log(path);
            if(path.indexOf("/tplus/")>-1){
                if(path=="/tplus/onlylogin"){
                    params.app="tplusOnly";
                }
                else{
                    params.app="tplus";
                }
            }
            return params;
        },

        getModuleName : function(){
            APP.pageUrl=window.location.href;
            APP.pathName=window.location.pathname;
            var pageName = window.location.pathname;

            if(pageName.substr(pageName.length - 1) == "/"){
                pageName = pageName.substr(0 , pageName.length - 1);
            }

            if(map[pageName]) pageName=map[pageName];
            return pageName ;
        },

        alert : function(content){

        },

        confirm : function(){},

        tips : function(){

        },

        getTextnode : function(/*String*/ html) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(html));
            var Texthtml=div.innerHTML;
            div=null;
            return Texthtml;
        }

    };

    if(!Array.prototype.indexOf){
        Array.prototype.indexOf = function(key){
            return Util.indexOf(this , key);
        }
    }


    if(!String.prototype.indexOf){
        String.prototype.indexOf = function(key){
            return Util.indexOf(this , key);
        }
    }

    if(!Date.prototype.format){
        Date.prototype.format = function (format) {
            var o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "H+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                "S": this.getMilliseconds() //millisecond
            };
            if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
                (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
            return format;
        };
    }

    return Util;

});
