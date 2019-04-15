import React, { Component } from 'react';
import './Dropzone.css';

import uploadIcon from './baseline-cloud_upload-24px.svg';

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { highlight: false };
    // Initialize input ref
    this.fileInputRef = React.createRef();
    // Binding event handler to access component 'this'
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    if (this.props.disabled) return;

    this.fileInputRef.current.click();
  }

  // This method will be called when the file dialog
  //  is closed and files have been selected.
  onFilesAdded(event) {
    if (this.props.disabled) return;

    const files = event.target.files;
    // we need to notify the parent component about the files droped
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
      // console.log(this.props);
    }
  }

  onDragOver(event) {
    event.preventDefault();

    if (this.props.disabled) return;
    // Highlight the dropzone if there is a drag inti it...
    this.setState({ highlight: true });
  }

  onDragLeave() {
    this.setState({ highlight: false });
  }

  onDrop(event) {
    event.preventDefault();

    if (this.props.disabled) return;
    /*
    In case a file is dropped onto the component,
    we need to notify the parent component about that
    */
    const files = event.dataTransfer.files;

    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }

    this.setState({ highlight: false });
  }

  /*
  convert the files we received from a FileList to 
  a plain JavaScript array, because that is much easier
   to work with.
  */
  fileListToArray(list) {
    const array = [];

    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    
    return array;
  }

  render() {
    return (
      <div 
        className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style= {{
          cursor: this.props.disabled ? "default" : "pointer"
        }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <img
          alt="upload"
          className="Icon"
          src={uploadIcon}
        />
        <span>Upload Files</span>
      </div>
    );
  }
}

export default Dropzone;