import React, { Component, Fragment } from "react";
import { MainNavbar } from "../component/dashboard";
import { ManageProfile } from "../component/manageProfile";

export class ManageProfilePage extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />
          <ManageProfile {...this.props} />
        </div>
      </Fragment>
    );
  }
}
