import React, { Component, Fragment } from "react";
import { ProductList } from "../component/product";
import { MainNavbar } from "../component/dashboard";
export class ProductPage extends Component {
  state = {};
  userInfo =
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
  componentDidMount() {
    if (!this.userInfo) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <Fragment>
        <div className="main-panel ps ps--active-y">
          <MainNavbar {...this.props} />

          <div className="content">
            <div className="content">
              <div className="container-fluid">
                <h3 className="text-right ir-r">لیست محصولات</h3>
                <br />
                <div className="row mt-5">
                  {" "}
                  <ProductList data={this.props.data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
