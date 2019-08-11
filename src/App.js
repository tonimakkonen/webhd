import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import Viewer from './Viewer.js'
import Line from './Line.js'
import Byte from './Byte.js'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileData: [],
    }
  }

  handleFileLoaded = (data, filePath) => {
    var fileByteArray = [];
    var array = new Uint8Array(data);
    for (var i = 0; i < array.length; i++) {
      fileByteArray.push(array[i]);
    }
    this.setState({fileLoaded: true, fileData: fileByteArray, filePath: filePath})
  }

  onDrop = (acceptedFiles) => {
    var file = acceptedFiles[0];
    var size = file.size;
    // Use some hard-coded limit for now to prevent freezing up the browser
    // TODO: This is reduntant as Dopzone has a limit?
    if (size > 2000000) {
      window.alert("File too big (500 kB is the limit)");
      return;
    }

    var reader = new FileReader();
    reader.onloadend = () => {
      this.handleFileLoaded(reader.result, file.path);
    }
    reader.readAsArrayBuffer(file);
  }

  render() {

    // TODO: Remove center tag
    return (
      <div className="App">
      <Dropzone multiple={false} maxSize={500000} onDrop={this.onDrop}>
          {({getRootProps, getInputProps}) => (
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="dropzoneText">
              Inspect the binary content of a file by dropping it here, or click me to select one.
              This app is best suited to inspect text files to e.g. check character encoding.
              500 kB is this max file size you can inspect.
              </div>
            </div>
          )}
      </Dropzone>
      <hr/>

      <div className="help">
        Every new line in the file is marked
        <Line lineNumber={5} index={89}/>
        by a line tag showing the line number and the byte.
        Simple ascii values are shown as light grey as
        <Byte value={65} />
        for the character A. Whitespace ascii characters are white
        <Byte value={32} />
        , control characters are red
        <Byte value={5} />
        , and values with the high byte set are blue
        <Byte value={195} /> <Byte value={150} /> as this UTF-8 encoding for Ö.
        The values of bytes are hex numbers.
      </div>

      <hr/>
      <Viewer fileLoaded={this.state.fileLoaded} fileData={this.state.fileData} filePath={this.state.filePath}/>
      </div>
    );
  }
}

export default App;
