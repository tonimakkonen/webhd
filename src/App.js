import React, { Component } from 'react';
import Viewer from './Viewer.js'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileData: [],
    }
  }

  handleFileLoaded = (data) => {
    var fileByteArray = [];
    var array = new Uint8Array(data);
    for (var i = 0; i < array.length; i++) {
      fileByteArray.push(array[i]);
    }
    this.setState({fileLoaded: true, fileData: fileByteArray})
  }

  handleFile = (event) => {
    var file = event.target.files[0];
    var size = file.size;
    // Use some hard-coded limit for now to prevent freezing up the browser
    if (size > 2000000) {
      window.alert("File too big (2 MB is the limit)");
      return;
    }

    var reader = new FileReader();
    reader.onloadend = () => {
      this.handleFileLoaded(reader.result);
    }
    reader.readAsArrayBuffer(file);
  }

  render() {

    return (
      <div className="App">
      <div className="App-header">
      <h2>Web Hex Dump</h2>
      </div>
      <input type="file" onChange={this.handleFile} />
      <Viewer fileLoaded={this.state.fileLoaded} fileData={this.state.fileData}/>
      </div>
    );
  }
}

export default App;
