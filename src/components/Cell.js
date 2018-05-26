import React, { Component } from 'react';
import classNames from 'classnames';
import '../App.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: 200,
      boardHeight: 100,
      board: [],
    };
  }

  render() {
    let cellClass = classNames('Cell', this.props.alive ? 'rouge' : 'blanc');
    return (
      <div className={cellClass}></div>
    );
  }
}

export default Cell;
