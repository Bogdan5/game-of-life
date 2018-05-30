import React, { Component } from 'react';
import '../App.css';

//labels for button groups
class Label extends Component {

  render() {
    return (
      <div className="Label">{this.props.content}</div>
    );
  }
}

export default Label;
