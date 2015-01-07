/**
 * Created by tonyjiang on 14/12/29.
 */
var Display = require('./display');


var htmlRender = new Display();

htmlRender.body.setTemplate("<h1>${title}</h1>");
htmlRender.body.setData({title : 'title is tony'});

console.log(htmlRender.render());


