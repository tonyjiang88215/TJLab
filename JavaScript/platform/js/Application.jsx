/**
 * Created by tonyjiang on 15/10/10.
 */
define([
    'jquery',
    'jqueryui',
    'modules/Util',
    'modules/Common',
    'modules/Storage',
    'modules/Constant',

    'lib/react/React'

] , function($ , jQueryUI , Util , Common , Storage , Constant , React){

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
            'element/SideBar',
            'element/Workbench',
            'element/PropertyBar',
            'element/Input'
        ],function(SideBar , Workbench , PropertyBar , Input){
            var data = {name : "tj"};

            var component = [
                {
                    name : "input",
                    type : "input"
                }
            ];


            var sideBar = window.sideBar =  React.render(<SideBar data={component} /> , $('.sidebar-wrapper')[0]);
            console.log(sideBar);
            //var workbench = window.workbench = React.render(<Workbench /> , $('.workbench-wrapper')[0]);

            var propertyBar = window.propertyBar = React.render(<PropertyBar /> , $('.propertyBar-wrapper')[0]);


            var comps = [];

            var i = 0;

            sideBar.on("newComps" , function(data){
                var stylePropertyChangeHandler  = function(styleProperty){
                    propertyBar.setState({styleProperty : styleProperty});
                };


                var newComps = React.renderIn(<Input /> , $('.workbench-wrapper')[0]);

                window["comp"+i++] = newComps;

                console.log(newComps);
                newComps.on("focus" , function(){
                    console.log('focus');
                    var state = newComps.state;
                    //console.log(state.styleProperty);
                    propertyBar.setState({styleProperty : state.styleProperty});
                    newComps.on("stylePropertyChange" , stylePropertyChangeHandler);
                });

                newComps.on("blur" , function(){
                    console.log('blur');
                    newComps.off("stylePropertyChange" , stylePropertyChangeHandler);
                });



            });



            $('.workbench-wrapper').mousedown(function(e){
                React.publish("focusCheck" , {element : e.target});
            });

        } , requireErrorCallback);

    };

    return Application;

});