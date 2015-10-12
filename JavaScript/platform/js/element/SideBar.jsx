/**
 * Created by tonyjiang on 15/10/10.
 */
define([
    "lib/react/ReactOrigin"
] , function(React){

    var SideBar = React.createClass({



        render : function(){
            var data = this.props.data;
            return (
                <div className="sidebar">
                    this is side bar , {data.name}
                </div>
            );

        }

    });
    return SideBar;

});