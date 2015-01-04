/**
 * Created by tonyjiang on 14/12/31.
 */
var base = require('./base');

var ClassBase = function(){
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

                arguments.callee.call(this , _this , _proto.constructor.prototype , arg);
                return _proto[name].apply(_this , arg);
            }else{
                return true;
            }
        })(this , this.constructor.prototype , arguments[0]);

    }
}

Function.prototype.extend = function(){
    this.prototype = new arguments[0];
    return base.hitch(this , function(){
        var o = new this();
        o.constructor = this;
        return o;
    });
};

var Car = function(){
    //this.name = 'name1';
    this.start = function(){
        console.log('car is start' , this.name);
        return 'car';
    }
};
Car = Car.extend(ClassBase);

var BenzCar = function(){
    //this.name = 'name2';
    this.start = function(){
        console.log('benz welcome' , this.name);
        console.log(this.inherited(arguments));

    }
};
BenzCar = BenzCar.extend(Car);

var C200 = function(){
    this.name = 'c200';
    this.start = function(){
        console.log('this is C200' , this.name);
        console.log(this.inherited(arguments));
    }

};
C200 = C200.extend(BenzCar);

var C63 =function(){
    this.name = 'xxxx';
    this.start = function(){
        console.log('this is c63' , this.name);
        this.inherited(arguments);
    }
};
C63 = C63.extend(C200);

var car = new C63();
car.start();

return;




var ObjectBase1 = {

    inherited : function(arg){
        var name = arg.callee.name;
        if(!name){
            for(var i in this){
                if(this[i] == arg.callee){
                    name = i;
                    break;
                }
            }
        }

        if(name){
            return this.constructor.prototype[name].apply(this.constructor.prototype , arg);
        }else{
            return true;
        }

    }

};

var ObjectBase = function(){
    this.inherited = ObjectBase1.inherited
}

Function.prototype.extend = function(){
    this.prototype = new arguments[0];
    return base.hitch(this , function(){
        var o = new this();
        o.constructor = this;
        return o;
    });
};

/*
var declare = function(){
    var _extends, _prototype;
    if(arguments.length == 1){
        _extends = [];
        _prototype = arguments[0];
    }else if(arguments.length >= 2){
        _extends = arguments[0];
        _prototype = arguments[1];
    }

    _extends.push(ObjectBase);

    var extendClass = function(){};

    var targetClass = function(){};
    targetClass.prototype = _prototype;

    var superClass = _extends[0];
    if(typeof superClass == 'Object'){
        extendClass.prototype = superClass;
    }else if(typeof superClass == 'Function'){
        extendClass.prototype = new superClass();
    }else{
        extendClass.prototype = {};
    }

    for(var i = 1, len = _extends.length ; i < len ; i++){
        if(typeof _extends[i] == 'Object'){
            var mixinClass = _extends[i];
        }else if(typeof _extends[i] == 'Function'){
            var mixinClass = new _extends[i]();
        }else{
            continue;
        }
        for(var i in mixinClass){
            if(mixinClass.hasOwnProperty(i)){
                extendClass.prototype[i] = mixinClass[i];
            }
        }

    }


    //targetClass.prototype = superClass;
    targetClass.__defineGetter__('constructor' , function(){
        return targetClass;
    });

    targetClass.prototype = new extendClass();

    for(var i in _prototype){
        targetClass.prototype[i] = _prototype[i];
    }

    targetClass.prototype.constructor = targetClass;

    return targetClass;
};


var Car = declare([] , {
    start : function(){
        console.log('car is start');
    }
});


var BenCar = declare([Car] , {
    start : function(){
        console.log('benz car is start');
        this.inherited(arguments);
    }
})

var car = new BenCar();
console.log(car);
car.start();

return;
*/

var Car = function(){
    this.start = function(){
        console.log('car is start');
    }
};
Car.extend(ObjectBase);
//Car.prototype = ObjectBase;
//Car.prototype.constructor = Car;

var BenzCar = function(){
    this.start = function(){
        console.log('benz welcome');
        //for(var i in arguments){
        //    console.log(i , arguments[i]);
        //}
        //console.log(2,arguments.callee , arguments.callee.name);
        this.inherited(arguments);
    }
};
BenzCar.extend(Car);
//BenzCar.prototype = new Car();
//BenzCar.prototype.constructor = BenzCar;


var C200 = function(){
    this.start = function(){
        console.log('this is C200');
        this.inherited(arguments);
    }

    //this.constructor = C200;
};
//C200.prototype = new BenzCar();
C200.extend(BenzCar);
//    C200.prototype.constructor = C200;



var car = new C200();
car.start();


return;

function hello(){
    console.log(arguments.callee.name);
};

hello();


var declare = function(){};

var Foo = function(){
    this.name = 'foo';
};

var FooP = function(){
    this.name = 'fooParent';
};

Foo.prototype = new FooP;
Foo.prototype.constructor = Foo;

//Foo.prototype = {
//    set value(val){
//        console.log('get:' , arguments);
//    },
//    get value(){
//        console.log('set:' , arguments);
//    }
//};

//(function(className , defineGetter){
//
//    className.prototype.__defineGetter__ = function(key , func){
//        console.log(arguments);
//        console.log(defineGetter);
//        //defineGetter.apply(className , func);
//        var defaultSetter = className.prototype.__lookupGetter__(key);
//        return defaultSetter ? defaultSetter() : undefined;
//    }
//
//})(Foo , Foo.prototype.__defineGetter__);

Foo.prototype.__defineGetter__('parent' , function(){
    console.log(arguments);
    console.log(this , this.constructor.prototype);
    return this.constructor.prototype;
});

var f = new Foo();
console.log('console.log : ' , f.name , f.parent.name , f.constructor.prototype.name);