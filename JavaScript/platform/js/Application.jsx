/**
 * Created by tonyjiang on 15/10/10.
 */
define([
    'jquery',
    'modules/Util',
    'modules/Common',
    'modules/Storage',
    'modules/Constant',

    'lib/react/ReactOrigin'

] , function($ , Util , Common , Storage , Constant , React){

    var Application = {};

    Application.startUp = function(){
        Util.mixin(APP,Common);
        APP.Storage = Storage;
        APP.Constant = Constant;

        APP.protocol = window.location.protocol + '//';

        var deviceType = "pc";
        var userAgent = navigator.userAgent.toLowerCase();
        if(userAgent.indexOf("iphone") != -1){
            deviceType = "iphone";
        }else if(userAgent.indexOf("android") != -1){
            deviceType = "android";
        }

        APP.deviceType = deviceType;

        var requireCallback = function(Page , Header){
        };

        var requireErrorCallback = function(err){
            console.log('require error');
            //document.write("Page Not Found.");
        };


        require([
            'element/SideBar'
        ],function(SideBar){
            var data = {name : "tj"};
            var sideBar = React.render(<SideBar data={data} /> , $('.sidebar-wrapper')[0]);
            console.log(sideBar);
        } , requireErrorCallback);

    };

    return Application;

});