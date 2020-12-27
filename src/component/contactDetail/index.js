import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loading from "../loading";
import moment from "moment-jalaali";
export class ContactDetail extends Component {
  state = {};
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const id = this.props.match.params.id;
    userService
      .fetchContactById(id)
      .then((res) => this.setState({ data: res.data }));
  }
  deleteContact() {
    const id = this.props.match.params.id;

    userService
      .deleteContact(id)
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/contact");
        } else console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  render() {
    return this.state.data ? (
      <div
        className="content container text-right ir-r"
        style={{
          paddingTop: "75px",
          paddingBottom: "200px",
        }}
      >
        <div className="col-md-12 ir-r">
          <div className="card ">
            <div className="card-header card-header-rose card-header-text">
              <div className="card-text">
                <h4 className="card-title ir-r">جزئیات پیام </h4>
              </div>
            </div>
            <div className="card-body ">
              <form method="get" action="/" className="form-horizontal">
                <div className="row">
                  <label className="col-sm-3 col-form-label ir-r text-right">
                    نام و نام خانوادگی:
                  </label>
                  <div className="col-sm-8">
                    <div className="form-group bmd-form-group">
                      <span className="ir-r">{this.state.data.fullName}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label ir-r text-right">
                    ایمیل:
                  </label>
                  <div className="col-sm-8">
                    <div className="form-group bmd-form-group">
                      <span className="ir-r">{this.state.data.email}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label ir-r order-detail-text-right">
                    متن پیام:
                  </label>
                  <div className="col-sm-8">
                    <div className="form-group bmd-form-group">
                      <span className="ir-r">{this.state.data.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label ir-r order-detail-text-right">
                    تاریخ:
                  </label>
                  <div className="col-sm-8">
                    <div className="form-group bmd-form-group">
                      <span className="ir-r">
                        {moment(
                          this.state.data.date,
                          "YYYY/MM/DD HH:mm:ss"
                        ).format("jYYYY/jM/jD ساعت: HH:mm:ss")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row mt-5 mb-4">
                  <div className="col-sm-8 mx-auto ir-r">
                    <Link
                      to="#"
                      className="btn btn-success  ir-r"
                      onClick={() =>
                        window.open(`mailto:${this.state.data.email}`)
                      }
                    >
                      پاسخ
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-danger mr-3 ir-r"
                      onClick={() =>
                        confirmAlert({
                          customUI: ({ onClose }) => {
                            return (
                              <div className="custom-ui text-right ">
                                <i className="material-icons-outlined">info</i>

                                <h1 className="ir-r">مطمئنید؟</h1>

                                <p className="ir-r">
                                  آیا شما میخواهید این پیام را پاک کنید؟
                                </p>
                                <button
                                  className="btn btn-danger"
                                  onClick={onClose}
                                >
                                  خیر
                                </button>
                                <button
                                  className="btn btn-success"
                                  onClick={() => {
                                    this.deleteContact();
                                    onClose();
                                  }}
                                >
                                  بله ، پاک کن!
                                </button>
                              </div>
                            );
                          },
                        })
                      }
                    >
                      حذف پیام
                    </Link>

                    <Link to="/" className="btn btn-info mr-3 ir-r">
                      صفحه اصلی
                    </Link>
                    <Link className="btn btn-muted mr-3 ir-r" to="/contact">
                      بازگشت
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}
