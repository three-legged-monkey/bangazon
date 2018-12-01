import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';

export class ComputerUpdate extends Component {
  updateComputer = () => {
    // computerRequest.updateComputer(this.props.computerId)
    // .then((res) => {
    //   this.props.updateState();
    // })
    // .catch((err) => {
    //   console.error('Error deleting a computer: ', err);
    // });
    this.props.changeInputStatus(this.props.computers,this.props.computerId);
  };

  render() {
    return (
      <div>
        <button onClick={this.updateComputer}>Update</button>
      </div>
    );
  }
}