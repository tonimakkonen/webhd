import React, { Component } from 'react';

class Viewer extends Component {

  constructor(props) {
    super(props);
  }

  getHex2(value) {
    var ret = value.toString(16);
    if (ret.length == 1) {
      ret = "0" + ret;
    }
    return ret;
  }

  createDisplayData() {
    const bytes = [];
    for (var i=0; i < this.props.fileData.length; i++) {
        bytes.push(this.getHex2(this.props.fileData[i]) + " ");
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


    return (
      <div className="Viewer">
      if (!this.props.fileLoaded) {
          <p>No file loaded</p>
      } else {
        <p>File loaded: {this.props.fileData.length} </p>
      }

      </div>
    );
  }
}

export default Viewer;
