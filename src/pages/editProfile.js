import React, { Component, Fragment } from "react";
import { MainNavbar } from "../component/dashboard";
import { EditProfile } from "../component/editProfile";

export class EditProfilePage extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />
          <EditProfile {...this.props} />
        </div>
      </Fragment>
    );
  }
}
