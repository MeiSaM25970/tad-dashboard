import React, { Component } from "react";
import validator from "validator";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link } from "react-router-dom";
import Loading from "../loading";

export class ChangePassword extends Component {
  state = {
    newPassword: "",
    oldPassword: "",
    configPassword: "",
    oldPasswordIsEmpty: false,
    newPasswordIsEmpty: false,
    configPasswordIsEmpty: false,
    configPasswordErr: false,
    isValid: false,
    oldPasswordErr: false,
    disableButton: true,
  };

  changeHandler(e) {
    const password = {};
    const name = e.target.name;
    const value = e.target.value;
    password[name] = value;
    this.setState({ ...this.state, ...password, disableButton: false });
  }

  async submitHandler(e) {
    await e.preventDefault();
    await this.setState({ oldPasswordErr: false });
    await this.validateFrom();
    if (
      !this.state.oldPasswordIsEmpty &&
      !this.state.newPasswordIsEmpty &&
      !this.state.configPasswordIsEmpty &&
      this.userInfo
    ) {
      await this.setState({ isValid: true });
      if (this.state.newPassword === this.state.configPassword) {
        this.setState({ configPasswordErr: false });
        const changePassword = {
          username: this.userInfo.username,
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword,
        };
        userService
          .changePassword(changePassword)
          .then((response) => {
            if (response.status === 200) {
              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div className="custom-ui text-right ">
                      <i className="material-icons-outlined">done</i>

                      <p className="ir-r">اطلاعات شما با موفقیت ذخیره شد.</p>

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
              this.setState({ disableButton: true });
            } else console.log(response.data);
          })
          .catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 400) {
              this.setState({ oldPasswordErr: true });
            } else console.log(error);
          });
      } else this.setState({ configPasswordErr: true });
    } else {
      await this.setState({ isValid: false });
    }
  }
  async validateFrom() {
    const oldPassword = await validator.isEmpty(this.state.oldPassword);
    const newPassword = await validator.isEmpty(this.state.newPassword);
    const configPassword = await validator.isEmpty(this.state.configPassword);

    if (oldPassword) {
      await this.setState({ oldPasswordIsEmpty: true });
    } else await this.setState({ oldPasswordIsEmpty: false });
    if (newPassword) {
      await this.setState({ newPasswordIsEmpty: true });
    } else await this.setState({ newPasswordIsEmpty: false });
    if (configPassword) {
      await this.setState({ configPasswordIsEmpty: true });
    } else await this.setState({ configPasswordIsEmpty: false });
  }

  render() {
    if (this.props.userInfo) {
      this.userInfo = this.props.userInfo;
    } else {
      this.userInfo =
        JSON.parse(localStorage.getItem("userInfo")) ||
        JSON.parse(sessionStorage.getItem("userInfo"));
    }
    return (
      <div className="content ir-r text-right">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-icon card-header-rose">
                  <div className="card-icon">
                    <i className="material-icons">vpn_key</i>
                  </div>
                  <h4 className="card-title ir-r">تغییر رمز عبور</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={this.submitHandler.bind(this)}>
                    <div className="row">
                      <div className="col-md-4 mt-auto">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            رمز عبور قبلی:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="oldPassword"
                            onChange={this.changeHandler.bind(this)}
                          />
                        </div>
                        {this.state.oldPasswordIsEmpty ? (
                          <small className="d-block text-danger text-center">
                            وارد نمودن رمزعبور قبلی اجباری است.
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-4 mt-auto">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            رمز عبور جدید:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={this.changeHandler.bind(this)}
                            name="newPassword"
                          />
                          {this.state.newPasswordIsEmpty ? (
                            <small className="d-block text-danger text-center">
                              وارد نمودن رمز عبور جدید اجباری است.
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
                          <label className="bmd-label-floating">
                            تکرار رمز عبور:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={this.changeHandler.bind(this)}
                            name="configPassword"
                          />
                          {this.state.configPasswordIsEmpty ? (
                            <small className="d-block text-danger text-center">
                              تکرار رمز عبور اجباری است .
                            </small>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {this.state.configPasswordErr ? (
                        <div className="col-md-6 mt-5 text-danger">
                          <span>پسورد جدید و تکرار آن با هم تطابق ندارد.</span>
                        </div>
                      ) : this.state.oldPasswordErr ? (
                        <div className="col-md-6 mt-5 text-danger">
                          <span>پسورد قبلی شما اشتباه است.</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-rose pull-right"
                      disabled={this.state.disableButton}
                    >
                      {this.state.loading ? <Loading /> : " تغییر رمز عبور"}
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
