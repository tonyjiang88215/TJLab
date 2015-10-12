/**
 * Created by tonyjiang on 15/2/8.
 */
define([
    'modules/_Extends',
    'modules/_Evented',
    'modules/Util',
    'jquery'
] , function(_Extends , _Evented , Util , $){

    //组件基础类
    var _WidgetBase = function(){
        //模板html
        this.templates = '';
        //title
        this.title = '畅捷通';
        //dom借点
        this.domNode = '';

        this.parentNode = document.body;

        this._beforeRender = function(){
            if(this.templates.indexOf("\"/")>-1){
                this.templates=this.templates.replace(/src="\//g,"src=\""+webRoot+"/");
            }
            this.domNode = $(this.templates)[0];
            if(this.parentNode instanceof $){
                this.parentNode = this.parentNode.get(0);
            }
            this.parentNode.appendChild(this.domNode);
        };

        //初始化
        this.init = function(){
            this._beforeRender();
            //$(this.domNode).html(this.templates);
            //console.log('widgetBase init');
        };

        //销毁
        this.destroy = function(){};
    };

    _WidgetBase = _WidgetBase.extend(_Extends , _Evented);

    return _WidgetBase;

});