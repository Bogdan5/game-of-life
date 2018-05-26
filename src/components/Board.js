import React, { Component } from 'react';
import Cell from './Cell.js';
import '../App.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: this.props.width,
      boardHeight: this.props.height,
      board: [],
      paused: false,
      reset: false,
    };
  }

  componentDidMount() {
    this.setBoard();
  }

  setBoard = () => {
    let cellList = [];
    let index = 1;
    for (let i = 0; i < this.state.boardHeight; i++) {
      let horizontal = [];
      for (let j = 0; j < this.state.boardWidth; j++) {
        let randomCell = { number: index++, alive: Math.random() < 0.5, height: i, width: j, };
        horizontal.push(randomCell);
      }

      cellList.push(horizontal);
    }

    this.setState({ board: cellList });
  };

  startAnimation = () => {
    this.setState({ paused: false, reset: false, });
    const start = setInterval(() => {
      if (this.props.reset) {
        clearInterval(start);
        this.setBoard();
      }

      !this.state.paused && this.oneTick();
    }, this.props.speed);
  };

  getNumberNeighbours = (height, width) => {
    let board = this.state.board;
    let number = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i !== 0 || j !== 0) {
          let h = i + height;
          let w = j + width;
          if (h === this.state.boardHeight) {h = 0;}

          if (h < 0) {h = this.state.boardHeight - 1;}

          if (w === this.state.boardWidth) {w = 0;}

          if (w < 0) {w = this.state.boardWidth - 1;}

          board[h][w].alive && number++;
        }
      }
    }

    return number;
  };

  oneTick = () => {
    let newBoard = [];
    this.state.board.forEach((item, index) => {
      let horizontal = [];
      item.forEach((cell, ind) => {
        let numNeighbours = this.getNumberNeighbours(index, ind);
        let newCell = Object.assign({}, cell);
        if (cell.alive && (numNeighbours < 2 || numNeighbours > 3)) {
          newCell.alive = false;
        } else if (!cell.alive && numNeighbours === 3) {
          newCell.alive = true;
        }

        horizontal.push(newCell);
      });
      newBoard.push(horizontal);
    });
    this.setState({ board: newBoard });
  };

  pause = () => {
    this.setState({ paused: !this.state.paused });
  };

  reset = () => {
    this.setState({ reset: true });
    this.setBoard();
    this.setState({ reset: false });
  };

  render() {
    return (
      <div className="App">
        {this.state.board.map((item) =>
          <div className="horizontalDiv">
            {item.map((cel) => <Cell key={cel.number} alive={cel.alive}/>)}
          </div>
          )
        }
        <button onClick={this.startAnimation}>Start</button>
        <button onClick={this.pause}>Pause</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default Board;
