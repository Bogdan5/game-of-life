import React, { Component } from 'react';
import classNames from 'classnames';
import '../App.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  submitter = () => this.props.submitter(this.state.number);

  getNumber = (e) => {
    let num = e.target.value;
    num = (typeof num === 'number') ? Math.ceil(num) : 0;
    this.setState({ number: num });
  };

  render() {
    return (
      <div className="Input">
        <input type="text" placeholder={this.props.placeholder} onChange={this.getNumber}></input>
        <Button role="submit" onClick={this.submitter}/>
      </div>
    );
  }
}

export default Input;
