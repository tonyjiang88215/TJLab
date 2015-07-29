/**
 * Created by tonyjiang on 14/12/31.
 */
var util = require('./util');


Function.prototype.extend = function(){
    this.prototype = new arguments[0];
    var _extendsPrototype = {};
    if(arguments.length > 1){
        for(var i = 1,len = arguments.length ; i < len ; i++){
            _extendsPrototype = util.mixin(_extendsPrototype , new arguments[i]);
        }
    }
    this.prototype = util.mixin(this.prototype , _extendsPrototype);
    return util.hitch(this , function(){
        var o = new this();
        o.constructor = this;
        return o;
    });
};

module.exports = Function.prototype.extend;



//var Car = function(){
//    //this.name = 'name1';
//    this.start = function(){
//        console.log('car is start' , this.name);
//        return 'car';
//    }
//};
//Car = Car.extend(ClassBase);
//
//var BenzCar = function(){
//    //this.name = 'name2';
//    this.start = function(){
//        console.log('benz welcome' , this.name);
//        console.log(this.inherited(arguments));
//
//    }
//};
//BenzCar = BenzCar.extend(Car);
//
//var C200 = function(){
//    this.name = 'c200';
//    this.start = function(){
//        console.log('this is C200' , this.name);
//        console.log(this.inherited(arguments));
//    }
//
//};
//C200 = C200.extend(BenzCar);
//
//var C63 =function(){
//    this.name = 'xxxx';
//    this.start = function(){
//        console.log('this is c63' , this.name);
//        this.inherited(arguments);
//    }
//};
//
//var T = function(){
//    this.engine = function(){
//        console.log('2.0t');
//    };
//
//    this.start = function(){
//        console.log('2.0t start');
//        this.inherited(arguments);
//
//    }
//};
//
//var fwd = function(){
//    this.start = function(){
//        console.log(' 4wd start');
//        this.inherited(arguments);
//    }
//}
//
//C63 = C63.extend(C200 );
//
//var car = new C63();
//car.start();
//
//return;
//
//
//
//
//var declare = function(){};
//
//var Foo = function(){
//    this.name = 'foo';
//};
//
//var FooP = function(){
//    this.name = 'fooParent';
//};
//
//Foo.prototype = new FooP;
//Foo.prototype.constructor = Foo;
//
////Foo.prototype = {
////    set value(val){
////        console.log('get:' , arguments);
////    },
////    get value(){
////        console.log('set:' , arguments);
////    }
////};
//
////(function(className , defineGetter){
////
////    className.prototype.__defineGetter__ = function(key , func){
////        console.log(arguments);
////        console.log(defineGetter);
////        //defineGetter.apply(className , func);
////        var defaultSetter = className.prototype.__lookupGetter__(key);
////        return defaultSetter ? defaultSetter() : undefined;
////    }
////
////})(Foo , Foo.prototype.__defineGetter__);
//
//Foo.prototype.__defineGetter__('parent' , function(){
//    console.log(arguments);
//    console.log(this , this.constructor.prototype);
//    return this.constructor.prototype;
//});
//
//var f = new Foo();
//console.log('console.log : ' , f.name , f.parent.name , f.constructor.prototype.name);
