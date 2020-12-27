import React, { Component } from "react";
import { loginUserStore } from "../Login/redux";
import * as userService from "../../service";
import { Link } from "react-router-dom";
import validator from "validator";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ChangePassword } from "../changePassword";

export class ManageProfile extends Component {
  state = {
    userInfo: {
      _id: "",
      firstName: "",
      lastName: "",
      imgPath: "",
      username: "",
      email: "",
      isComplete: false,
    },
    newUserInfo: {
      _id: "",
      firstName: "",
      lastName: "",
      imgPath: "",
      username: "",
      email: "",
      isComplete: false,
      adminId: "",
    },
    emailIsEmptyErr: false,
    emailTypeErr: false,
    firstNameIsEmptyErr: false,
    lastNameISEmptyErr: false,
    loading: false,
    disableButton: true,
  };
  async getUserInfo() {
    const adminInfo =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    await this.setState({ adminInfo: JSON.parse(adminInfo) });
    const username = this.props.match.params.username;
    userService
      .findByUserName(username)
      .then((res) => {
        this.setState({ userInfo: res.data, loading: false });
      })
      .finally(() => this.createNewUserInfo());
  }
  componentDidMount() {
    this.unsubscribe = loginUserStore.subscribe(() => {
      const arrayNumber = loginUserStore.getState().length;
      this.setState({
        adminInfo: loginUserStore.getState()[arrayNumber - 1],
      });
    });
    this.getUserInfo();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  changeHandler(e) {
    const user = {};
    const name = e.target.name;
    const value = e.target.value;
    user[name] = value;
    this.setState({
      disableButton: false,
      newUserInfo: { ...this.state.newUserInfo, ...user },
    });
  }
  createNewUserInfo() {
    if (!this.state.userInfo.username) {
      this.setState({
        newUserInfo: { ...this.state.newUserInfo, username: "" },
      });
    } else
      this.setState({
        newUserInfo: {
          ...this.state.newUserInfo,
          username: this.state.userInfo.username,
        },
      });
    if (!this.state.userInfo.email) {
      this.setState({ newUserInfo: { ...this.state.newUserInfo, email: "" } });
    } else
      this.setState({
        newUserInfo: {
          ...this.state.newUserInfo,
          email: this.state.userInfo.email,
        },
      });
    if (!this.state.userInfo.firstName) {
      this.setState({
        newUserInfo: { ...this.state.newUserInfo, firstName: "" },
      });
    } else
      this.setState({
        newUserInfo: {
          ...this.state.newUserInfo,
          firstName: this.state.userInfo.firstName,
        },
      });
    if (!this.state.userInfo.lastName) {
      this.setState({
        newUserInfo: { ...this.state.newUserInfo, lastName: "" },
      });
    } else
      this.setState({
        newUserInfo: {
          ...this.state.newUserInfo,
          lastName: this.state.userInfo.lastName,
        },
      });
    if (!this.state.userInfo.imgPath) {
      this.setState({
        newUserInfo: { ...this.state.newUserInfo, imgPath: "" },
      });
    } else
      this.setState({
        newUserInfo: {
          ...this.state.newUserInfo,
          imgPath: this.state.userInfo.imgPath,
        },
      });
    this.setState({
      newUserInfo: {
        ...this.state.newUserInfo,
        _id: this.state.userInfo._id || "",
        adminId: this.state.adminInfo._id || "",
        imgPath: this.state.userInfo.imgPath || "",
        isComplete: true,
      },
    });
  }
  async submitHandler(event) {
    await event.preventDefault();
    await this.setState({
      loading: true,
    });
    await this.inputValidation();
    if (this.state.newUserInfo.isComplete) {
      await userService
        .editProfile(this.state.newUserInfo)
        .then(async (res) => {
          await this.getUserInfo();
          await confirmAlert({
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
          await this.setState({ disableButton: true });
        });
    } else this.setState({ loading: false, submitErr: true });
  }
  async inputValidation() {
    const emailIsEmpty = validator.isEmpty(this.state.newUserInfo.email);
    const emailType = validator.isEmail(this.state.newUserInfo.email);
    const firstNameIsEmpty = validator.isEmpty(
      this.state.newUserInfo.firstName
    );
    const lastNameIsEmpty = validator.isEmpty(this.state.newUserInfo.lastName);
    if (emailIsEmpty) {
      await this.setState({ emailIsEmptyErr: true, loading: false });
    } else await this.setState({ emailIsEmptyErr: false });
    if (!emailType) {
      await this.setState({ emailTypeErr: true, loading: false });
    } else await this.setState({ emailTypeErr: false });
    if (firstNameIsEmpty) {
      await this.setState({ firstNameIsEmptyErr: true, loading: false });
    } else await this.setState({ firstNameIsEmptyErr: false });
    if (lastNameIsEmpty) {
      await this.setState({ lastNameISEmptyErr: true, loading: false });
    } else await this.setState({ lastNameISEmptyErr: false });

    if (!emailIsEmpty && emailType && !firstNameIsEmpty && !lastNameIsEmpty) {
      await this.setState({
        newUserInfo: { ...this.state.newUserInfo, isComplete: true },
      });
    } else
      this.setState({
        newUserInfo: { ...this.state.newUserInfo, isComplete: false },
      });
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
                  <h4 className="card-title ir-r">ویرایش پروفایل</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={this.submitHandler.bind(this)}>
                    <div className="row">
                      <div className="col-md-3 mt-auto">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            نام کاربری
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={this.state.userInfo.username}
                            disabled={true}
                            name="username"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mt-auto">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">ایمیل</label>
                          <input
                            type="email"
                            className="form-control"
                            defaultValue={this.state.newUserInfo.email}
                            onChange={this.changeHandler.bind(this)}
                            name="email"
                          />

                          {this.state.emailIsEmptyErr ? (
                            <small className="d-block text-danger mt-2">
                              {"وارد نمودن ایمیل اجباری است."}
                            </small>
                          ) : this.state.emailTypeErr ? (
                            <small className="d-block text-danger mt-2">
                              {"ایمیل صحیح نمی باشد."}
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
                          <label className="bmd-label-floating">نام</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={this.state.userInfo.firstName}
                            onChange={this.changeHandler.bind(this)}
                            name="firstName"
                          />
                          {this.state.firstNameIsEmptyErr ? (
                            <small className="d-block text-danger mt-2">
                              {"وارد نمودن نام اجباری است."}
                            </small>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            نام خانوادگی
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={this.state.userInfo.lastName}
                            onChange={this.changeHandler.bind(this)}
                            name="lastName"
                          />
                          {this.state.lastNameISEmptyErr ? (
                            <small className="d-block text-danger mt-2">
                              {"وارد نمودن نام خانوادگی اجباری است."}
                            </small>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row " style={{ marginTop: 100 }}>
                      <div className="mr-5">
                        <button
                          type="submit"
                          className="btn btn-rose pull-right"
                          disabled={
                            this.state.disableButton || this.state.loading
                          }
                        >
                          {this.state.loading ? "صبر کنید..." : " ذخیره"}
                        </button>
                        <Link to="/dashboard">
                          <button className=" btn btn-mute" type="button">
                            بازگشت
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
        <ChangePassword userInfo={this.state.userInfo} />
      </div>
    );
  }
}
