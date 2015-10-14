/**
 * Created by tonyjiang on 15/10/10.
 */
(function(window){

    var protocol = window.location.protocol + '//';

    with(window){
        if("undefined" == typeof console){
            console = {log : function(){}};
        }

        window._require_cross_domain = true;
        APP = {};
        webRoot = '/TJLab/JavaScript/platform';
        host = protocol + window.location.host;
        //document.body.innerHTML="";
        noHeader=false;
    }

    require.config({
        baseUrl: window.webRoot+'/js',
        paths : {
            //text插件
            text : 'lib/require-text',
            //css插件
            css : 'lib/require-css',
            less : 'lib/require-less',
            cssPath : webRoot+'/css',
            vmPath: webRoot+'/vm',
            //jQuery
            jquery : 'lib/jquery',
            jqueryui : 'lib/jquery-ui-1.11.4/jquery-ui'
        },
        //urlArgs : version.version
        urlArgs : "bust="+(new Date().getTime())
    });


    //version文件来定义当前打包版本的时间戳
    require([window.webRoot + '/js/version.js'],function(version , Application){
            //重新设置require的时间戳

            if(!version){
                version = {
                    timestamp : new Date().getTime()
                }
            }

            require.config({
                urlArgs : version.timestamp
//        urlArgs : "bust="+(new Date().getTime())
            });

            //加载应用
            require([
                './Application'
            ] , function(Application){
                Application.startUp();
            });

        });

})(window);
