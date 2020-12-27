import React, { Component } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import * as userService from "../../service";
import Loading from "../loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export class NewUser extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    userInfo: {},
    usernameIsEmpty: false,
    emailIsEmpty: false,
    passwordIsEmpty: false,
    emailTypeErr: false,
    isValid: false,
    usernameAvailable: false,
    mobileTypeErr: false,
  };

  async componentDidMount() {}
  changeHandler(e) {
    const userInfo = {};
    const name = e.target.name;
    const value = e.target.value;
    userInfo[name] = value;
    this.setState({ ...this.state, ...userInfo });
  }

  async submitHandler(e) {
    await e.preventDefault();
    await this.validateFrom();
    if (
      !this.state.emailIsEmpty &&
      !this.state.passwordIsEmpty &&
      !this.state.usernameIsEmpty &&
      !this.state.emailTypeErr &&
      !this.state.mobileTypeErr
    ) {
      await this.setState({ isValid: true });
      const userInfo = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        type: "admin",
      };

      await userService
        .register(userInfo)
        .then((response) => {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="custom-ui text-right ">
                  <i className="material-icons-outlined">done</i>

                  <p className="ir-r">کاربر جدید با موفقیت اضافه شد</p>

                  <button
                    className="btn btn-success"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    باشه
                  </button>
                </div>
              );
            },
          });
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.setState({ usernameAvailable: true });
          } else console.log(error);
        });
    } else {
      await this.setState({ isValid: false });
    }
  }
  async validateFrom() {
    const username = await validator.isEmpty(this.state.username);
    const email = await validator.isEmpty(this.state.email);
    const password = await validator.isEmpty(this.state.password);
    const emailType = await validator.isEmail(this.state.email);
    const mobileType = await validator.isMobilePhone(
      this.state.username,
      "fa-IR"
    );
    if (username) {
      await this.setState({ usernameIsEmpty: true });
    } else await this.setState({ usernameIsEmpty: false });
    if (email) {
      await this.setState({ emailIsEmpty: true });
    } else await this.setState({ emailIsEmpty: false });
    if (password) {
      await this.setState({ passwordIsEmpty: true });
    } else await this.setState({ passwordIsEmpty: false });
    if (emailType) {
      await this.setState({ emailTypeErr: false });
    } else await this.setState({ emailTypeErr: true });
    if (!mobileType) {
      await this.setState({ mobileTypeErr: true });
    } else await this.setState({ mobileTypeErr: false });
  }

  render() {
    this.fullName =
      this.state.userInfo.firstName + " " + this.state.userInfo.lastName;
    return (
      <div className="content ir-r text-right">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-icon card-header-rose">
                  <div className="card-icon">
                    <i className="material-icons">perm_identity</i>
                  </div>
                  <h4 className="card-title ir-r">کاربر جدید</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={this.submitHandler.bind(this)}>
                    <div className="row">
                      <div className="col-md-3 mt-auto">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            تلفن همراه
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="username"
                            onChange={this.changeHandler.bind(this)}
                          />
                        </div>
                        {this.state.usernameIsEmpty ? (
                          <small className="d-block text-danger text-center">
                            تلفن همراه اجباری است.
                          </small>
                        ) : this.state.mobileTypeErr ? (
                          <small className="d-block text-danger text-center">
                            تلفن همراه اشتباه است.{" "}
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-4 mt-auto">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">ایمیل</label>
                          <input
                            type="email"
                            className="form-control"
                            onChange={this.changeHandler.bind(this)}
                            name="email"
                          />
                          {this.state.emailIsEmpty ? (
                            <small className="d-block text-danger text-center">
                              ایمیل اجباری است.
                            </small>
                          ) : this.state.emailTypeErr ? (
                            <small className="d-block text-danger text-center">
                              ایمیل اشتباه است.
                            </small>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">رمز عبور</label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={this.changeHandler.bind(this)}
                            name="password"
                          />
                          {this.state.passwordIsEmpty ? (
                            <small className="d-block text-danger text-center">
                              رمز عبور اجباری است.
                            </small>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {this.state.usernameAvailable ? (
                      <small className="d-block text-danger text-right">
                        این تلفن همراه قبلاً ثبت شده است.
                      </small>
                    ) : (
                      ""
                    )}
                    <button type="submit" className="btn btn-rose pull-right">
                      {this.state.loading ? <Loading /> : " ذخیره"}
                    </button>
                    <Link to="/dashboard">
                      <button className=" btn btn-mute" type="button">
                        بازگشت
                      </button>
                    </Link>
                    <div className="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
