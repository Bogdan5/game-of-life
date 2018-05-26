import React, { Component } from 'react';
import classNames from 'classnames';
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
    this.props.clicker(this.props.role);
  }

  render() {
    let cellClass = classNames('Cell', this.props.alive ? 'rouge' : 'blanc');
    return (
      <button className={cellClass} onClick={this.clicker}></button>
    );
  }
}

export default Button;
