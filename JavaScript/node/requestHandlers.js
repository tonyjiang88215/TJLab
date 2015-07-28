/**
 * Created by tonyjiang on 14/12/11.
 */

var exec = require('child_process').exec;
var queryString = require('querystring');
var formidable = require('formidable');
var sys = require('sys');
var fs = require('fs');
var Display = require('./display');
var crypto = require('crypto');
//var ejs = require('ejs');

//console.log(ejs);

var _lastFile = '';

var handler = {
    '/list' : function(request , response){

        var data = request.array;

        for(var i in data){
            data.execute = false;
        }

        for(var i = 0 ; i < data.length/10 ; i++){

        }

        this.on('complete' , function(){
            var _rs = true;
            for(var i = 0 ; i < data.length ; i++){
                _rs = _rs && data[i].execute;

                if(!_rs){return;}
            }




        });

       exec('ls -l' , function(error , output){
           console.log(arguments);

           for(var i = 0 ; i< 10 ; i++){

               data[i].excute = true;
           }

           this.emit('complete');



           //response.writeHead(200 , {"Content-Type" : "text/html"});
           //response.write(output);
           //response.end();



       });





    },
    '/start' : function(request , response){
      var body = [
          '<html>' +
          '<head>' +
          '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />' +
          '</head>' +
          '<body>'+
          '<form action="/upload" method="post">'+
          '<textarea name="text" rows="20" cols="60"></textarea>'+
          '<input type="submit" value="Submit text" />'+
          '</form>'+
          '</body>'+
          '</html>'
      ].join('');

      response.writeHead(200 , {"Content-Type" : "text/html"});
      response.write(body);
      response.end();
  },
    '/upload' : function(request , response){
        var data = '';
        request.setEncoding('utf8');
        request.addListener("data" , function(postDataChunk){
            data += postDataChunk;
        });

        request.addListener("end" , function(){
            response.writeHead(200 , {"Content-Type" : "text/plain"});
            response.write('you`ve sent : ' + queryString.parse(data).text);
            response.end();
        });

        console.log('Request handler "upload" was called');
    },
    '/file' : function(request , response){

        var _display = new Display();

        fs.readFile('./templates/file.html' , 'utf8' , function(error , data){
            if(!error){
                _display.body.setTemplate(data);
                _display.body.setData({title : 'hello this is title'});

                response.writeHead(200 , {"Content-Type" : "text/html"});
                response.write(_display.render());
                response.end();
            }
        });

        //_display.setTemplate();



    },
    '/jstest' : function(request , response){
        var _display = new Display();

        fs.readFile('./templates/jstest.html' , 'utf8' , function(error , data){
            if(!error){
                _display.body.setTemplate(data);
                _display.body.setData({title : 'hello this is title'});

                response.writeHead(200 , {"Content-Type" : "text/html"});
                response.write(_display.render());
                response.end();
            }
        });
    },
    '/uploadFile' : function(request , response){

    var form = new formidable.IncomingForm();
    form.parse(request , function(err , fields , files){
        response.writeHead(200, {'content-type': 'text/plain'});
        response.write('received upload:\n\n');
        _lastFile = files.upload.path;
        response.end(sys.inspect({fields: fields, files: files}));
    });

},
    '/show' : function(request , response){
    fs.readFile(_lastFile , 'binary' , function(error , file){
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
},
    '/getMD5ForBaidu' : function(request , response ,args){
        if(args.str){
            //md5.update(args.str);
            var key = "6ca28842b92d657b99650f2aa9a29742";
            args.str += "&secret="+key;

            var str = (new Buffer(args.str)).toString("binary");
            //var str = args.str;

            var md5 = crypto.createHash('md5').update(str).digest('hex');
            var content =  args.callback+'({sign:"' + md5 + '"}';
            response.write(content);
            response.end();
        }else{
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.write("str must be passed\n");
            response.end();
        }

    },
    '/s8s' : function(request , response){
        var body = [
            '<html>' ,
            '<head>' ,
            '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />' ,
            '<script type="text/javascript" src="http://120.25.219.51/client/fbs_loader.js"></script>',
            '</head>' ,
            '<body>',
            '</body>',
            '</html>'
        ].join('');

        response.writeHead(200 , {"Content-Type" : "text/html"});
        response.write(body);
        response.end();
    }
};

module.exports = handler;

//for(var i in requestHandler){
//    exports[i] = requestHandler[i];
//}
