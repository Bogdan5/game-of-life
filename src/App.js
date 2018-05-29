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
      boardWidth: 7,
      boardHeight: 7,
      board: [],
      number: 12,
      start: false,
      paused: false,
      reset: false,
      speed: 600,
    };
  }

  // componentDidMount() {
  //   this.setState({ number: Math.floor(this.state.boardWidth * this.state.boardHeight / 2) });
  // }

  clicked = (type) => {
    let obj = {};
    if (type === 'start') {
      this.setState({ start: true, paused: false, reset: false, });
    } else if (type === 'paused') {
      const p = !this.state.paused;
      console.log('paused clicked', p);
      this.setState({ start: false, paused: p, reset: false, });
    } else if (type === 'reset') {
      this.setState({ start: false, paused: false, reset: true, });
    }

    switch (type) {
      case 'small':
        this.setState({ boardWidth: 7, boardWidth: 7, start: false, });
        break;
      case 'medium':
        this.setState({ boardWidth: 25, boardHeight: 20, start: false, });
        break;
      case 'large':
        this.setState({ boardWidth: 50, boardHeight: 20, start: false, });
        break;
      case 'slow':
        this.setState({ speed: 1000, start: false, });
        break;
      case 'moderate':
        this.setState({ speed: 600, start: false, });
        break;
      case 'fast':
        this.setState({ speed: 300, start: false, });
        break;
    }

    this.setState(obj);
  };

  setNumber = (num) => {
    this.setState({ number: num || Math.floor(this.state.boardWidth * this.boardWidth / 2),
      start: false, });
  };

  render() {
    return (
      <div className="App">
        <Board height={this.state.boardHeight} width={this.state.boardWidth}
        speed={this.state.speed} aliveStart={this.state.number} nrAlive={this.state.number}
        start={this.state.start} reset={this.state.reset} paused={this.state.paused}/>
        <div className="buttonGroup">
          <Label content="Game controls"/>
          <Button purp={'start'} clicker={this.clicked}/>
          <Button purp={'paused'} clicker={this.clicked}/>
          <Button purp={'reset'} clicker={this.clicked}/>
        </div>
        <div className="buttonGroup">
          <Label content="Game speed"/>
          <Button purp={'slow'} clicker={this.clicked}/>
          <Button purp={'moderate'} clicker={this.clicked}/>
          <Button purp={'fast'} clicker={this.clicked}/>
        </div>
        <div className="buttonGroup">
          <Label content="Board size"/>
          <Button purp={'small'} clicker={this.clicked}/>
          <Button purp={'medium'} clicker={this.clicked}/>
          <Button purp={'large'} clicker={this.clicked}/>
        </div>
        <div className="buttonGroup">
          <Input placeholder={'Number live cells'} submitter={this.setNumber}/>
        </div>
      </div>
    );
  }
}

export default App;
