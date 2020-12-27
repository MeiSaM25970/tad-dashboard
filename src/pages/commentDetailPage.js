import React, { Component, Fragment } from "react";
import { CommentDetail } from "../component/commentDetail";
import { MainNavbar } from "../component/dashboard";

export class CommentDetailPage extends Component {
  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />
          <CommentDetail {...this.props} />
        </div>
      </Fragment>
    );
  }
}
