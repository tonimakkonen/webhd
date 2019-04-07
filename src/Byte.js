import React, { Component } from 'react';

import './Byte.css';
import './ByteHighBit.css';

class Byte extends Component {

  constructor(props) {
    super(props);
    this.state = {
      binary: this.getBinary(this.props.value),
      ascii: this.getAscii(this.props.value),
      hex: this.getHex(this.props.value),
    };
  }

  getBinary(value) {
    var str = new Number(value).toString(2);
    if (str.length < 8) {
        str = "0".repeat(8-str.length) + str;
    }
    return str;
  }

  getAscii(value) {
    if (value >= 33 && value <= 126) {
      return String.fromCharCode(value);
    } else if (value == 32) {
      return " ";
    } else {
        return "...";
    }
  }

  getHex(value) {
    var ret = value.toString(16);
    if (ret.length == 1) {
      ret = "0" + ret;
    }
    if (value == 10 || value == 16) {
      ret = ret;
    }
    return ret;
  }

  render() {
    // TODO: Use less copy pasted code
    if (this.props.value > 127) {
      return (
        <div className="ByteHighBit">
        {this.state.ascii}
        <br />
        {this.state.hex}
        </div>
      );
    } else {
      return (
        <div className="Byte">
        {this.state.ascii}
        <br />
        {this.state.hex}
        </div>
      );
    }

  }
}

export default Byte;
