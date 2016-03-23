//import CommonInput from './widgets/Input.jsx'
//import NumberInput from './widgets/NumberInput.jsx'
//import React from 'react'
//import ReactDOM from 'react-dom'

var CommonInput = require('./widgets/Input.jsx');
var NumberInput = require('./widgets/NumberInput.jsx');
var React = require('react');
var ReactDOM = require('react-dom');


class App extends React.Component{

    render(){
        return (
            <div onClick={this.queryData}>
                    <CommonInput value={this.props.value} />
                    <NumberInput value={this.props.value} />
            </div>
            );

    }
}


ReactDOM.render(<App value='21' /> , document.getElementById('react-input'));
//ReactDOM.render(<NumberInput /> , document.getElementById('react-input2'));



