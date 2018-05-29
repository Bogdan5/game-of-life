import React, { Component } from 'react';
import '../App.css';

class Label extends Component {

  render() {
    return (
      <div className="Label">{this.props.content}</div>
    );
  }
}

export default Label;
