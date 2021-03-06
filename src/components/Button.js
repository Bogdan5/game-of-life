import React, { Component } from 'react';
import '../App.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: 200,
      boardHeight: 100,
      board: [],
    };
  }

  clicker = () => {
    this.props.clicker(this.props.purp);
  };

  render() {
    return (
      <button className="Button" onClick={this.clicker}>{this.props.purp}</button>
    );
  }
}

export default Button;
