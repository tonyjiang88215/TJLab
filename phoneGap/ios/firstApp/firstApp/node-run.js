
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');


var app = express();
app.all('*', function(req, res, next) {
    var _url = req.originalUrl;
    if(/\.html$/.test(_url)||/\.less/.test(_url)){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        //res.header("Content-Type", "application/json;charset=utf-8");
    }

    next();
});

// all environments
app.set('port', process.env.PORT || 3001);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

// development only
if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}

app.all('*', function(req, res, next) {
    res.sendfile(__dirname+'/www/'+req.originalUrl);
});
//app.get('/', routes.index);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
