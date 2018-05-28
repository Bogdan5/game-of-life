import React, { Component } from 'react';
import Button from './Button.js';
import classNames from 'classnames';
import '../App.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  submitter = () => this.props.submitter(this.state.number);

  getNumber = (e) => {
    let num = e.target.value;
    this.setState({ number: parseInt(num) });
  };

  render() {
    return (
      <div className="Input">
        <input type="text" placeholder={this.props.placeholder} onChange={this.getNumber}></input>
        <Button purp="submit" clicker={this.submitter}/>
      </div>
    );
  }
}

export default Input;
