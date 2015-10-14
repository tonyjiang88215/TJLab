define([
    'jquery',
    'lib/react/React'
] , function($ , React){

    var PropertyBar = React.createClass({

        getDefaultProps : function(){
            return {};
        },

        getInitialState : function(){
            var property = {
                styleProperty : {
                    x : 200,
                    y : 50
                }
            };


            return property;
        },

        render : function(){
            return (
                <div className="propertyBar">
                    <div className="property-item">
                        <div className="item-label">坐标X</div>
                        <div className="item-value">
                            <input value={this.state.styleProperty.x}  />
                        </div>
                    </div>
                    <div className="property-item">
                        <div className="item-label">坐标Y</div>
                        <div className="item-value">
                            <input value={this.state.styleProperty.y}  />
                        </div>
                    </div>
                    <div className="property-item">
                        <div className="item-label">宽度</div>
                        <div className="item-value">
                            <input value={this.state.styleProperty.width}  />
                        </div>
                    </div>
                    <div className="property-item">
                        <div className="item-label">高度</div>
                        <div className="item-value">
                            <input value={this.state.styleProperty.height}  />
                        </div>
                    </div>
                </div>
            );
        }


    });

    return PropertyBar;

});