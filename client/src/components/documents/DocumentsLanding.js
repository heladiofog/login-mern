import React, { Component } from "react";
// Upload component
import UploadDoc from './Upload';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class DocumentsLanding extends Component {
  // onLogoutClick = e => {
  //   e.preventDefault();
  //   alert("Logout click!");
  //   // this.props.logoutUser();
  // };

  render() {
    // auth has a property obj called user
    const { user } = this.props.auth;
    
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey </b> {user.name.split(" ")[0]},
              <p className="flow-text grey-text text-darken-1">
                Sube aquí tus documentos...
              </p>
            </h4>
            <div className="Card">
              <UploadDoc />
            </div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

DocumentsLanding.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // console.log(state);
  // the info coming from auth state sent from AuthReducer
  auth: state.auth 
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(DocumentsLanding);