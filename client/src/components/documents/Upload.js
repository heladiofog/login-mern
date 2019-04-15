import React, { Component } from 'react';

import Dropzone from '../dropzone/Dropzone';
import Progress from '../progress/Progress';
import './Upload.css';
import CheckIcon from './baseline-check_circle-24px.svg';

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {}, // state and progress
      successfullUploaded: false
    };
    // binding
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }
  // When files are added to the form
  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }
  // Async method to upload files
  async uploadFiles() {
    // Cleaning any previous uploadProgress
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));  //  Send the upload request of teh file
    })

    try {
      // Try to upload all the files and update the state whe it is successfully finished
      await Promise.all(promises);
      this.setState({ successfullUploaded: true, uploading: false });
    } catch (error) { //  If error on uploading...
      alert("There was some error on uploading the files, please try later.");
      this.setState({ successfullUploaded: false, uploading: false });
    }
  }
  // Upload files to the server
  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      // Event listeners for the several events of the uploading...
      // progress
      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });
      // loading
      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });
      // error
      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", "/api/project/upload");
      req.send(formData);
    });
  }
  // Some actions for the "Upload" button
  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          // When the upload finishes, it cleans the state of the button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {  //  Otherwise, the button appears disabled if the files list is empty or there is some uploading in progress
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }
  // Showing progress upload for each file
  renderProgress(file) {
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
                    <span className="Filename">{file.name}</span>
                    {/* Progress bar for each file... */}
                    {this.renderProgress(file)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>
        </div>
      </div>
    );
  }
}

export default Upload;