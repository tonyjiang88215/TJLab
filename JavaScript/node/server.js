/**
 * Created by tonyjiang on 14/12/11.
 */
var http = require('http');


var route = null;
var handler = null;

function mainRoute(request , response){
    route(handler , request , response);
}

function start(_route , _handler){
    route = _route;
    handler = _handler;

    http.createServer(mainRoute).listen(8888);

    console.log('server has started.');

}

exports.start = start;

