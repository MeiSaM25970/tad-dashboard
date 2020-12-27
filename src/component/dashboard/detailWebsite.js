import React, { Component, Fragment } from "react";
import * as userService from "../../service";
import numeral from "numeral";
// import ShowCalendar from "../calendar/calendar";

export class DetailWebsite extends Component {
  state = { successOrder: 0, price: 0, webVisit: 0 };
  async componentDidMount() {
    await this.fetchOrder();
    this.fetchWebsiteVisit();
  }
  fetchOrder() {
    userService
      .fetchOrder()
      .then((res) => {
        this.setState({ orders: res.data });
        this.orderCount();
      })
      .catch((err) => console.log(err));
  }
  fetchWebsiteVisit() {
    userService
      .counter()
      .then((res) => this.setState({ webVisit: res.data.webVisit }));
  }
  orderCount() {
    if (this.state.orders) {
      this.state.orders.forEach((order) => {
        if (order.isSuccess === true) {
          this.setState({
            successOrder: this.state.successOrder + 1,
            price: +order.price + this.state.price,
          });
        }
      });
    }
  }
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card card-stats ">
              <div
                className="card-header card-header-warning card-header-icon "
                style={{ height: 100 }}
              >
                <div className="card-icon">
                  <i className="material-icons">weekend</i>
                </div>
                <p className="card-category">کل سفارشات</p>
                <h3 className="card-title ir-r">{this.state.successOrder}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card card-stats ">
              <div
                className="card-header card-header-success card-header-icon"
                style={{ height: 100 }}
              >
                <div className="card-icon">
                  <i className="material-icons">store</i>
                </div>
                <p className="card-category">جمع پرداختی ها</p>
                <h3 className="card-title ir-r">
                  {numeral(this.state.price).format("0,0") + "  تومان"}
                </h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card card-stats ">
              <div
                className="card-header card-header-rose card-header-icon"
                style={{ height: 100 }}
              >
                <div className="card-icon">
                  <i className="material-icons">equalizer</i>
                </div>
                <p className="card-category">بازدید کل</p>
                <h3 className="card-title ir-r">{this.state.webVisit}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6 mx-auto">
            {/* <ShowCalendar {...this.props} /> */}
          </div>
        </div>
      </Fragment>
    );
  }
}
