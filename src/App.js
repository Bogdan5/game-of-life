import React, { Component } from 'react';
import Board from './components/Board.js';
import Button from './components/Button.js';
import Input from './components/Input.js';
import Label from './components/Label.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: 7,//board dimensins
      boardHeight: 7,
      board: [],//array representing board
      number: 12, //number of alive cells
      start: false, //true if game started
      paused: false,//true if game paused
      reset: false,//true if game reset
      speed: 600,//speed of game
      boardSize: 'Small',//type of board size
    };
  }

  //this method transmits the type of button pressed from Button
  clicked = (type) => {
    if (type === 'Start') {
      this.setState({ start: true, paused: false, reset: false, });
    } else if (type === 'Pause') {
      const p = !this.state.paused;
      this.setState({ start: false, paused: p, reset: false, });
    } else if (type === 'Reset') {
      this.setState({ start: false, paused: false, reset: true, });
    }

    switch (type) {
      case 'Small':
        this.setState({ boardWidth: 7, boardHeight: 7, start: false, boardSize: type, });
        break;
      case 'Medium':
        this.setState({ boardWidth: 25, boardHeight: 20, start: false, boardSize: type, });
        break;
      case 'Large':
        this.setState({ boardWidth: 40, boardHeight: 30, start: false, boardSize: type, });
        break;
      case 'Slow':
        this.setState({ speed: 1000, start: false, });
        break;
      case 'Moderate':
        this.setState({ speed: 600, start: false, });
        break;
      case 'Fast':
        this.setState({ speed: 300, start: false, });
        break;
    }
  };

  //transmits from Input the number of alive cells
  setNumber = (num) => {
    this.setState({ number: num || Math.floor(this.state.boardWidth * this.boardWidth / 2),
      start: false, });
  };

  render() {
    return (
      <div className="App">
        <Board height={this.state.boardHeight} width={this.state.boardWidth}
          boardSize={this.state.boardSize}
        speed={this.state.speed} aliveStart={this.state.number} nrAlive={this.state.number}
        start={this.state.start} reset={this.state.reset} paused={this.state.paused}/>
        <div className="buttonGroup">
          <Label content="Game controls"/>
          <Button purp={'Start'} clicker={this.clicked}/>
          <Button purp={'Pause'} clicker={this.clicked}/>
          <Button purp={'Reset'} clicker={this.clicked}/>
        </div>
        <div className="buttonGroup">
          <Label content="Game speed"/>
          <Button purp={'Slow'} clicker={this.clicked}/>
          <Button purp={'Moderate'} clicker={this.clicked}/>
          <Button purp={'Fast'} clicker={this.clicked}/>
        </div>
        <div className="buttonGroup">
          <Label content="Board size"/>
          <Button purp={'Small'} clicker={this.clicked}/>
          <Button purp={'Medium'} clicker={this.clicked}/>
          <Button purp={'Large'} clicker={this.clicked}/>
        </div>
        <div className="buttonGroup">
          <Input placeholder={'Number live cells'} submitter={this.setNumber}/>
        </div>
      </div>
    );
  }
}

export default App;
