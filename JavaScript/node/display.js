/**
 * Created by tonyjiang on 14/12/12.
 */
var base = require('./util');
require('./_Extends');

//原型定义(静态方法)
function DisplayPrototype(){

    this.template = '';

    var _modules = {};

    var _data = {};

    this.addModule = function(moduleName , moduleHtml , moduleData){

        _modules[moduleName] = {
            html : moduleHtml,
            data : moduleData
        };
    };

    this.addModuleObject = function(moduleName , moduleObject){

        _modules[moduleName] = moduleObject;
    };

    this.setData = function(data){
        _data = base.mixin(_data , data);
    }

    this.render = function(){

        var moduleHtml = {};
        for(var moduleName in _modules){

            var module = _modules[moduleName];
            if(module){
                if(module instanceof Module){
                    var moduleObject = module;
                }else{
                    var moduleObject = new Module(module.html);
                    moduleObject.setData(module.data);
                }
            }

            moduleHtml[moduleName] = module.render();

        }

        _data = base.mixin(_data , moduleHtml);


        return this.template.replace(/\$\{[^\$\{\}]+\}/ig , function(sMatch){
            return _data[sMatch.replace('${' , '').replace('}' , '')];
        });




    };

    this.setTemplate = function(template){
        this.template = template;
    }

}

function Module(){

    var JSElements = [];
    var CSSElements = [];

    this.addJavaScript = function(scriptPath){
        JSElements.push('<script type="text/javascript" src="'+scriptPath+'"></script>');
    };

    this.addJavaScriptCode = function(script){

        if(script.indexOf('<script') == -1){
            script = '<script type="text/javascript">'+script+'</script>';
        }
        JSElements.push(script);
    };

    this.addCSS = function(cssPath){
        CSSElements.push('<link rel="stylesheet" type="text/css" href="'+cssPath+'" />');
    };

    this.render = function(){

        var JSHtml = JSElements.join('');
        var CSSHtml = CSSElements.join('');

        this.template = CSSHtml+JSHtml+this.template;
        return base.hitch(this , this.constructor.prototype.render)();

    };


}
Module = Module.extend(DisplayPrototype);
//Module.prototype = new DisplayPrototype();
//Module.prototype.constructor = Module;

//html 头部
function Header(){

    var _htmlHeaders = [];
    var _httpHeaders = [];
    var _title = '';
    var _header = 'header.html';

    this.setHeader = function(path){
        if(path){
            _header = path;
        }
    };

    this.addHtmlHeader = function(html){
        _htmlHeaders.push(html);
    };

    this.addHttpHeader = function(http){
        _httpHeaders.push(http);
    };

    this.addJavaScript = function(script){
        var scriptHtml = '<script type="text/javascript" src="'+script+'"></script>';
        this.addHtmlHeader(scriptHtml);
    };

    this.addJavaScriptCode = function(script){
        if(script.indexOf('<script') == -1){
            script = '<script type="text/javascript">'+script+'</script>';
        }
        this.addHtmlHeader(script);
    };

    this.addCSS = function(css){
        var cssHtml = '<link rel="stylesheet" type="text/css" href="'+css+'">';
        this.addHtmlHeader(cssHtml);
    };

    this.setTitle = function(title){
        _title = title;
    };

    this.render = function(){

        var headerHTML = _htmlHeaders.join('');

        this.setData({headerTagElement : headerHTML});
console.log(this.constructor == Header);

        return base.hitch(this , this.constructor.prototype.render)();


    }

}
Header = Header.extend(DisplayPrototype);
//Header.prototype =  new DisplayPrototype();
//Header.prototype.constructor = Header;

//html Body体
function Body(){

}
Body = Body.extend(DisplayPrototype);
//Body.prototype =  new DisplayPrototype();
//Body.prototype.constructor = Body;

//html 尾部
function Footer(){

}
Footer = Footer.extend(DisplayPrototype);
//Footer.prototype =  new DisplayPrototype();
//Footer.prototype.constructor = Footer;


function Display(config){

    this.header = new Header();
    this.body = new Body();
    this.footer = new Footer();

    this.render = function(){
        var html = '';
        html += this.header.render();
        html += this.body.render();
        html += this.footer.render();

        return html;

    };

}

module.exports = Display;