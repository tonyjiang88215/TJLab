define([
    'jquery',
    "lib/react/React",
    'modules/Util'
],function($ , React , Util) {

    var Input = React.createClass({

        //static properties
        getDefaultProps : function(){
            return {};
        },

        //instance properties
        getInitialState : function(){
            return {
                focus : false,
                data : {
                    type : "input",
                    placeholder : "this is placeholder",
                    defaultValue : "defaultValue"
                },
                styleProperty : {
                    width : '300px',
                    height : '30px',
                    x : 0 ,
                    y : 0
                }

            }
        },


        render : function(){
            //var styleString = "";
            //for(var i in this.props.styleProperty){
            //    if(this.props.styleProperty.hasOwnProperty(i)){
            //        styleString += [i , ":" , this.props.styleProperty[i] , ";"].join('');
            //    }
            //}

            var inputStyle = {
                width:this.state.styleProperty.width,
                height : this.state.styleProperty.height
            };

            var dragStyle = {
            //    position : "absolute",
            //    top : 0 , left : 0 , width : "100%" , height : "100%",
            //    visibility : this.state.focus ? "visible" : "hidden"
            };

            var wrapperClass = "input-wrapper";
            if(this.state.focus){
                wrapperClass += " focused";
            }


            return (
                <div className={wrapperClass} style={this.state.styleProperty} onClick={this.clickHandler}>
                    <input className="ElInput" style={inputStyle} value={this.state.data.defaultValue} placeholder={this.state.data.placeholder} />
                    <div className="drag-cover" style={dragStyle}></div>
                </div>

            );

        },

        componentDidMount : function(){
            console.log('bind draggable');
            //$(this.getDOMNode()).draggable();

            console.log(this.state);

            var domNode = this.getDOMNode();

            $(domNode).resizable({ grid:[5,5], resize : Util.hitch(this , this.resizeHandler)}).resizable({disabled:true});

            $(domNode).draggable({grid:[5,5] , drag : Util.hitch(this , this.dragHandler)});

            this.subscribe('focusCheck' , Util.hitch(this , function(e){
               if($.contains(domNode , e.element)){
                    this.focusHandler();
               } else{
                   this.blurHandler();
               }
            }));
        },

        focusHandler : function(e){

            if(this.state.focus){
                return;
            }
            this.setState({focus : true});

            $(this.getDOMNode()).resizable({disabled : false});

            console.log(this);

            this.emit("focus" , {});

        },

        blurHandler : function(){
            if(!this.state.focus){
                return ;
            }

            this.setState({focus : false});

            $(this.getDOMNode()).resizable({disabled : true});

            this.emit("blur" , {});

        },

        resizeHandler : function(event , ui ){
            this.setState(Util.mixin(this.state.styleProperty , {width : ui.size.width , height : ui.size.height}));
            this.emit('stylePropertyChange' , this.state.styleProperty);
        },

        dragHandler : function(event , ui){
            this.setState(Util.mixin(this.state.styleProperty , {x : ui.position.left , y : ui.position.top}));
            this.emit('stylePropertyChange' , this.state.styleProperty);
        }


    });
    return Input;

});