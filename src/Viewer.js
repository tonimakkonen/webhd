import React, { Component } from 'react';
import Byte from './Byte.js'
import Line from './Line.js'

class Viewer extends Component {

  constructor(props) {
    super(props);
  }

  createDisplayData() {
    const bytes = [];
    var lineNumber = 1;
    var lastChar = -1;
    var needNewLine = false;
    for (var i=0; i < this.props.fileData.length; i++) {
      var value = this.props.fileData[i];

      // First line:
      if (i == 0) {
        bytes.push(<Line lineNumber={lineNumber} index={i} />);
      }

      // We always push the current byte to the values
      bytes.push(<Byte value={value} index={i} linenumber={lineNumber} />);

      if (value == 10 || value == 13) {
        lineNumber = lineNumber + 1;
        bytes.push(<br />);
        bytes.push(<Line lineNumber={lineNumber} index={i} />);
      }

      lastChar = value;
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
