import React, { Component, Fragment } from "react";
import { ContactDetail } from "../component/contactDetail";
import { MainNavbar } from "../component/dashboard";

export class ContactDetailPage extends Component {
  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />
          <ContactDetail {...this.props} />
        </div>
      </Fragment>
    );
  }
}
