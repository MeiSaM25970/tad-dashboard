import React, { Component, Fragment } from "react";
import { Contact } from "../component/contact";
import { MainNavbar } from "../component/dashboard";
import * as userService from "../service";

export class ContactPage extends Component {
  state = { contact: [] };
  componentDidMount() {
    userService
      .fetchContact()
      .then((res) => {
        this.setState({ contact: res.data });
      })
      .catch(() => this.props.history.push("/error"));
  }
  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />
          <Contact contact={this.state.contact} {...this.props} />
        </div>
      </Fragment>
    );
  }
}
