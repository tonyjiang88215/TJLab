/**
 * Created by tonyjiang on 15/4/24.
 */

require("./_Extends");
var _Evented = require("./_Evented");


var _WidgetBase = function(){
    this.inherited = function(){
        return (function(_this , _proto , arg){
            var name = arg.callee.name;
            if(!name){
                for(var i in _this){
                    if(_this[i] == arg.callee){
                        name = i;
                        break;
                    }
                }
            }
            if(name && _proto[name]){
                _proto[name].apply(_this , arg);
                arguments.callee.call(this , _this , _proto.constructor.prototype , arg);
            }
        })(this , this.constructor.prototype , arguments[0]);

    }
};
_WidgetBase = _WidgetBase.extend(_Evented);

module.exports = _WidgetBase;

