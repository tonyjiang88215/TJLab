/**
 * Created By WanXing 15/5/13 下午4:31
 * Summary:
 */

define(
    [
        "lib/react/ReactOrigin",
        "modules/_Evented",
        "util/Dom"
    ],
    function(React,_Evented , DomUtil){

        //销毁由renderIn方法创建的实例
        var Destroy=function(){
            React.unmountComponentAtNode(this.container);
            DomUtil.destroy(this.container);
        };



        //React.componentDestory=Destroy;
        //React.mixin=Tools.mixinObj;
        //React.deepMixin=Tools.deepMixin;


        //render的增强方法，用于自动创建一个中间层放置react组件，以完成组件插入到DOM树时，造成清空插入节点的所有子节点的问题
        //同时增加destory方法，便于组件的销毁
        React.renderIn=function(func,node,place){
            var newNode=DomUtil.create("div");
            DomUtil.place(newNode,node,place);

            var obj=React.render(func,newNode);
            obj.container=newNode;
            obj.containerIn=node;
            obj.destory=Destroy;
            return obj;
        };

        var xReact=function(){
            //this.createClass = function (spec) {
            //    var getClass = React.createClass(spec);
            //    var events = new _Evented();
            //
            //    ////判断是否有componentWillUnmount方法，用于插入清除事件的方法clearOwnEvents
            //    //if(getClass.prototype.componentWillUnmount){
            //    //    var temp=getClass.prototype.componentWillUnmount;
            //    //    getClass.prototype.componentWillUnmount=function(){
            //    //        EventPlugin.clearOwnEvents(this);
            //    //        temp(arguments);
            //    //    };
            //    //}
            //    //else{
            //    //    getClass.prototype.componentWillUnmount=function(){
            //    //        EventPlugin.clearOwnEvents(this);
            //    //    }
            //    //}
            //    //getClass.prototype.ownEvents=EventPlugin.ownEvents;
            //    //getClass.prototype.clearOwnEvents=EventPlugin.clearOwnEvents;
            //    //getClass.prototype.on=EventPlugin.on;
            //    //getClass.prototype.emit=EventPlugin.emit;
            //    //getClass.prototype.subscribe=EventPlugin.subscribe;
            //    //getClass.prototype.publish=EventPlugin.publish;
            //    getClass.prototype.on = events.on;
            //    getClass.prototype.off = events.off;
            //    getClass.prototype.emit = events.emit;
            //    getClass.prototype.publish = _Evented.publish;
            //    getClass.prototype.subscribe = _Evented.subscribe;
            //
            //    return getClass;
            //};

            this.createElement  = function(type, config, children){
                var getElement = React.createElement(type, config, children);
                var events = new _Evented();

                getElement.on = events.on;
                getElement.off = events.off;
                getElement.emit = events.emit;
                getElement.publish = _Evented.publish;
                getElement.subscribe = _Evented.subscribe;

                return getElement;
            }

            //this.Date=DateUtil;
            //this.Dom=DomUtil;
            //this.Formatter=Formatter;
            //this.EventPlugin={
            //    publish:EventPlugin.publish
            //};
        };

        xReact.prototype=React;
        xReact.prototype.publish = _Evented.publish;
        xReact.prototype.describe = _Evented.describe;

        var xReactObj = new xReact();

        //xReact.prototype=Tools.mixinObj(EventPlugin,React);

        return xReactObj;

        //return React;

    }
);