/**
 * Created by tonyjiang on 15/10/10.
 */
define([
    "lib/react/React",
    'modules/Util',
    "./Input"
] , function(React , Util , Input){

    var Icon = React.createClass({

        clickHandler : function(){
            console.log("click icon");
            this.emit("click" , {});
        },

        render : function(){
            return (
              <div className="icon" onClick={this.clickHandler}>
                <div className="iconTable">
                    <div className="iconTd">
                        {this.props.name}
                    </div>
                </div>
              </div>
            );
        }

    });

    var SideBar = React.createClass({




        render : function(){
            var data = {
                defaultValue : "test",
                placeholder : 'qqq me'
            };

            return (
                <div className="sidebar">
                    <Icon name="输入框" ref="icon" comps={Input}></Icon>
                </div>
            );

        },

        componentDidMount : function(){
            this.refs.icon.on("click" , Util.hitch(this , function(){
                console.log('catch icon click');
                this.emit("newComps" , {type : "input"});
            }));
        }

    });



    return SideBar;

});