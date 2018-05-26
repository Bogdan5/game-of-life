import React, { Component } from 'react';
import Board from './components/Board.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: 5,
      boardHeight: 5,
      board: [],
    };
  }

  clicked = (type) => {
    
  }

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
        <Input />
      </div>
    );
  }
}

export default App;
