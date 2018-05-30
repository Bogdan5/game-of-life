import React, { Component } from 'react';
import Cell from './Cell.js';
import classNames from 'classnames';
import '../App.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],//array represeting the board
      reset: false,//true if board reset
      endgame: false,//true if game ended
    };
  }

  componentDidMount() {
    this.setBoard();
  }

  //sets the board when dimensions or speed changed or board reset and starts animation
  componentDidUpdate(prevProps) {
    !prevProps.start && this.props.start && this.startAnimation();
    if ((!prevProps.reset && this.props.reset) || ((prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width) || (prevProps.speed !== this.props.speed))
    || (prevProps.nrAlive !== this.props.nrAlive)) {
      this.setState({ reset: true });
      this.setBoard();
    }

  }

  //sets the board
  setBoard = () => {
    //in order to create a determinate number of random positions and array of
    //numbers is created, sorted, and the required number is chosen
    let randArr = [];
    let arr = [];
    for (let k = 0; k < (this.props.height * this.props.width - 1); k++) {
      randArr.push({ num: k, val: Math.random(), });
    }

    randArr.sort((a, b) => (a.val - b.val));
    for (let l = 0; l < this.props.nrAlive; l++) {
      arr[l] = randArr[l].num;
    }

    arr.sort((a, b) => a - b);
    let cellList = [];
    let index = 0;
    for (let i = 0; i < this.props.height; i++) {
      let horizontal = [];
      for (let j = 0; j < this.props.width; j++) {
        let a = (i * this.props.width + j) === arr[index];
        let randomCell = { number: i * this.props.height + j,
          alive: a,
          height: i, width: j, };
        horizontal.push(randomCell);
        a && index++;
      }

      cellList.push(horizontal);
    }

    this.setState({ board: cellList });
  };

  startAnimation = () => {
    this.setState({ reset: false, endgame: false, });
    const start = setInterval(() => {
      if (this.state.reset) {
        clearInterval(start);
      }

      if (this.state.endgame) {
        clearInterval(start);
        this.setState({ endgame: false });
      }

      !this.props.paused && !this.state.reset && this.oneTick();
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
          if (h === this.props.height) {h = 0;}

          if (h < 0) {h = this.props.height - 1;}

          if (w === this.props.width) {w = 0;}

          if (w < 0) {w = this.props.width - 1;}

          board[h][w].alive && number++;
        }
      }
    }

    return number;
  };

  oneTick = () => {
    let newBoard = [];
    let endgame = true;
    let changeMade = false;
    this.state.board.forEach((item, index) => {
      let horizontal = [];
      item.forEach((cell, ind) => {
        let numNeighbours = this.getNumberNeighbours(index, ind);
        let newCell = Object.assign({}, cell);
        if (cell.alive && (numNeighbours < 2 || numNeighbours > 3)) {
          newCell.alive = false;
          changeMade = true;
        } else if (!cell.alive && numNeighbours === 3) {
          newCell.alive = true;
          changeMade = true;
        }

        horizontal.push(newCell);
        if (endgame && cell.alive) { endgame = false;}
      });
      newBoard.push(horizontal);
    });

    (endgame || !changeMade) && this.setState({ endgame: true });
    this.setState({ board: newBoard });
  };

  render() {
    let boardClass = classNames({ ['Board-' + this.props.boardSize]: true, Board: true, });
    let horizClass = classNames({ ['horizontalDiv-' + this.props.boardSize]: true,
      horizontalDiv: true, });
    return (
      <div className={boardClass}>
        {this.state.board.map((item, index) =>
          <div key={index} className={horizClass}>
            {item.map((cel) => <Cell key={cel.number} alive={cel.alive}/>)}
          </div>
          )
        }
      </div>
    );
  }
}

export default Board;
