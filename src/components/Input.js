import React, { Component } from 'react';
import Button from './Button.js';
import '../App.css';

//contains the input field with number of alive cell and a submit Button
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  //transmits the number to App
  submitter = () => this.props.submitter(this.state.number);

  //reads the number in the input
  getNumber = (e) => {
    let num = e.target.value;
    this.setState({ number: parseInt(num) });
  };

  render() {
    return (
      <div className="Input">
        <input type="text" className="inputNr" placeholder={this.props.placeholder}
          onChange={this.getNumber}></input>
        <Button purp="submit" clicker={this.submitter}/>
      </div>
    );
  }
}

export default Input;
