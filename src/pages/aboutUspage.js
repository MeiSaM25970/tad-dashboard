import React, { Component, Fragment } from "react";
import { AboutUs } from "../component/aboutUs";
import { MainNavbar } from "../component/dashboard";
export class AboutUsPage extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />
          <AboutUs {...this.props} />
        </div>
      </Fragment>
    );
  }
}
