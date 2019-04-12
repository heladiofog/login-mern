import React, { Component } from 'react';

import Dropzone from '../dropzone/Dropzone';
import Progress from '../progress/Progress';

import CheckIcon from './baseline-check_circle-24px.svg';

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false 
    };
    // binding
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded (files) {
    this.state(prevState => ({
      files: prevState.file.concat(files)
    }));
  }

  uploadFiles () {
    // TO DO
  }
  
  sendRequest () {
    // TO DO
  }

  renderActions () {

  }

  renderProgress (file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploadProgress.uploading ||
      this.state.successfullUploaded) {
        return (
          <div className="ProgressWraper">
            <Progress progress={uploadProgress ?
              uploadProgress.percentage : 0}
            />
            <img 
              className="CheckIcon"
              alt="done"
              // src={CheckIcon}
              src="img/baseline-check_circle-24px.svg"
              style={{
                opacity: uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
              }}
            />
          </div>
        );
      }
  }
  render() {
    return (
      // Upload field
      <div>
        <div className="Upload">
          <span className="Title">Upload Files</span>
          <div className="Content">
            <div>
              <Dropzone onFilesAdded={this.onFilesAdded}
                disabled={this.state.uploading ||
                this.state.successfullUploaded} 
              />
            </div>
            <div className="Files">
              {this.state.files.map(file => {
                return (
                  <div key={file.name} className="Row">
                    <span className="Filename">
                      {file.name}
                    </span>
                    {this.renderProgress(file)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Actions" >{this.renderActions()}</div>
        </div>
      </div>
    );
  }
}

export default Upload;