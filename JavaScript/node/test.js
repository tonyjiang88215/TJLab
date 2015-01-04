/**
 * Created by tonyjiang on 14/12/29.
 */
var Display = require('./display');

var htmlRender = new Display();

htmlRender.body.setTemplate("<h1>${title}</h1>");
htmlRender.body.setData({title : 'title is tony'});

console.log(htmlRender.render());


var Test  = function(){
    this.name = '';

    this.showSex = function(){
        console.log(this);
        console.log(this.sex);
    }
}

var Test2 = function(){
    this.sex = 'male';
}

Test.prototype = new Test2;

var a = new Test();
a.showSex();

console.log(a.constructor == Test);