/**
 * Created by tonyjiang on 15/10/10.
 */
define([
    "lib/react/React"
] , function(React){

    var WorkBench = React.createClass({

        getDefaultProps : function(){
            return {
                comps : []
            };
        },

        createComps : function(data){
            var comps = this.props.comps;
            comps.push(data);
            this.setProps(comps);
        },

        render : function(){

            return (
                <div className="workbench">
                </div>
            );
        }
    });

    return WorkBench;

});