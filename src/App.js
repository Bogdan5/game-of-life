import React, { Component } from 'react';
import Board from './components/Board.js';
import Button from './components/Button.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: 5,
      boardHeight: 5,
      board: [],
      number: 0,
      start: false,
      paused: false,
      reset: false,
      size: 'small',
      speed: 'medium',
    };
  }

  clicked = (type) => {
    
  }

  setNumber = (num) => {
    this.setState({ number: num });
  };

  render() {
    return (
      <div className="App">
        <Board height={this.state.boardHeight} width={this.state.boardWidth}
        speed={500}/>
        <div>
          <Button role={'start'} clicker={this.clicked}/>
          <Button role={'pause'} clicker={this.clicked}/>
          <Button role={'reset'} clicker={this.clicked}/>
        </div>
        <div>
          <Button role={'slow'} clicker={this.clicked}/>
          <Button role={'moderate'} clicker={this.clicked}/>
          <Button role={'fast'} clicker={this.clicked}/>
        </div>
        <div>
          <Button role={'small'} clicker={this.clicked}/>
          <Button role={'medium'} clicker={this.clicked}/>
          <Button role={'large'} clicker={this.clicked}/>
        </div>
        <Input placeholder={'Number live cells'} submitter={this.setNumber}/>
      </div>
    );
  }
}

export default App;
