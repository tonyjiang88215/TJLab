/**
 * Created by tonyjiang on 14/12/11.
 */
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');


server.start(router.route , requestHandlers);