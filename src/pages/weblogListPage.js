import React, { Component, Fragment } from "react";
import { MainNavbar } from "../component/dashboard";
import { itemsStore } from "../component/weblog/redux/store";
import { WeblogList } from "../component/weblog/weblogList";
import * as userService from "../service";

export class WeblogListPage extends Component {
  state = { data: [] };
  userInfo =
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
  componentDidMount() {
    if (!this.userInfo) {
      this.props.history.push("/login");
    } else this.fetchData();
    this.unsubscribe = itemsStore.subscribe(() => this.fetchData());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchData() {
    userService.fetchWeblog().then((res) => this.setState({ data: res.data }));
  }
  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />

          <div className="content">
            <div className="content">
              <div className="container-fluid">
                <h3 className="text-right ir-r">لیست مقالات</h3>
                <br />
                <div className="row mt-5">
                  {" "}
                  <WeblogList data={this.state.data} {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
