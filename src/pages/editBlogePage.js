import React, { Component, Fragment } from "react";
import { MainNavbar } from "../component/dashboard";
import { EditWeblog } from "../component/weblog/editWeblog";
export class EditBlogPage extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />
          <EditWeblog {...this.props} />
        </div>
      </Fragment>
    );
  }
}
