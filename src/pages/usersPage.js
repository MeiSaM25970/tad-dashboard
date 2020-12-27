import React, { Component, Fragment } from "react";
import { MainNavbar } from "../component/dashboard";
import { Users } from "../component/users";

export class UsersPage extends Component {
  state = { comments: [] };
  componentDidMount() {}
  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />
          <Users {...this.props} />
        </div>
      </Fragment>
    );
  }
}
