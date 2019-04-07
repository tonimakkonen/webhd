import React, { Component } from 'react';
import Byte from './Byte.js'

class Viewer extends Component {

  constructor(props) {
    super(props);
  }

  createDisplayData() {
    const bytes = [];
    for (var i=0; i < this.props.fileData.length; i++) {
      var value = this.props.fileData[i];
      bytes.push(<Byte value={value} />);
      if (value == 10 || value == 13) {
        bytes.push((<br />));
      }
    }
    return bytes;
  }

  render() {

    if (!this.props.fileLoaded) {
      return (
        <div className="Viewer">
        <p>No file loaded</p>
        </div>
      );
    } else {
      return (
        <div className="Viewer">
        <p>Size in bytes: {this.props.fileData.length}</p>
        {this.createDisplayData()}
        </div>
      );

    }
  }
}

export default Viewer;
