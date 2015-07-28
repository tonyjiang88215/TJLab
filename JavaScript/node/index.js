/**
 * Created by tonyjiang on 14/12/11.
 */
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var _WidgetBase = require("./_WidgetBase");

var a = new _WidgetBase();

server.start(router.route , requestHandlers);

