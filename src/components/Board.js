import React, { Component } from 'react';
import Cell from './Cell.js';
import '../App.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      reset: false,
      endgame: false,
    };
  }

  componentDidMount() {
    this.setBoard();
  }

  componentDidUpdate(prevProps) {
    !prevProps.start && this.props.start && this.startAnimation();
    if ((!prevProps.reset && this.props.reset) || ((prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width) || (prevProps.speed !== this.props.speed))
    || (prevProps.nrAlive !== this.props.nrAlive)) {
      console.log('changed');
      this.setState({ reset: true });
      this.setBoard();
    }

  }

  setBoard = () => {
    let randArr = [];
    let arr = [];
    for (let k = 0; k < (this.props.height * this.props.width - 1); k++) {
      randArr.push({ num: k, val: Math.random(), });
    }

    randArr.sort((a, b) => {
      if (a.val > b.val) {return 1;};

      if (a.val < b.val) {return -1;};

      if (a.val === b.val) {return 0;};
    });

    for (let l = 0; l < this.props.nrAlive; l++) {
      arr[l] = randArr[l].num;
    }

    arr.sort((a, b) => a - b);
    console.log(arr, typeof arr[0]);
    let cellList = [];
    let index = 0;
    for (let i = 0; i < this.props.height; i++) {
      let horizontal = [];
      for (let j = 0; (j < this.props.width); j++) {
        let a = (i * this.props.height + j) === arr[index];
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
    console.log('start animation');
    this.setState({ reset: false, endgame: false, });
    const start = setInterval(() => {
      if (this.state.reset) {
        console.log('clearing');
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
    console.log('starting tick');
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

    // console.log('______________');
    (endgame || !changeMade) && this.setState({ endgame: true });
    this.setState({ board: newBoard });
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
      </div>
    );
  }
}

export default Board;
