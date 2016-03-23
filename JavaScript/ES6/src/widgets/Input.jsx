import React from 'react'
import '../build/input.debug.css'

export default class CommonInput extends React.Component{

    render(){
        return (<input type="text" className="input" value={this.props.value} onClick={this._clickHandler} />);
    }

    _clickHandler(e){
        console.log('click' , e , this);
        console.log(2.345);
    }


}