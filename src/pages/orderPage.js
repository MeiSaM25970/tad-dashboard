import React, { Component, Fragment } from "react";
import { MainNavbar } from "../component/dashboard";
import { Order } from "../component/order/order";
import * as userService from "../service";

export class OrderPage extends Component {
  state = { orders: [] };
  componentDidMount() {
    userService
      .fetchOrder()
      .then((res) => {
        this.setState({ orders: res.data });
      })
      .catch(() => window.location.replace("/error"));
  }
  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />
          <Order orders={this.state.orders} {...this.props} />
        </div>
      </Fragment>
    );
  }
}
