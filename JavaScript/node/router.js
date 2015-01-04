/**
 * Created by tonyjiang on 14/12/11.
 */
var url = require('url');

function route(handler , request , response){
    var pathname = url.parse(request.url).pathname;
    console.log(' rout a request for' + pathname);
    if(typeof handler[pathname] == 'function'){
        handler[pathname](request , response);
    }else{
        console.log('no request handler found for ' + pathname);
        response.writeHead(404 , {"Content-Type" : "text/plain"});
        response.write('404 Not Found.');
        response.end();
    }
}

exports.route = route;