/**
 * Created by tonyjiang on 15/4/23.
 */

var HelloMessage = React.createClass({
    getInitialState : function(){
        return {liked : false}
    },
    handleClick : function(event){
      this.setState({liked : ! this.state.liked});
    },
   render : function() {
       var text = this.state.liked ? "like" : "not liked";
       return (
               <p onClick={this.handleClick}>
               You {text} this. Click to toggle.
               </p>
           );

   }

});

React.render(
    <HelloMessage />,
    document.getElementById('example')
);