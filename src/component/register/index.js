import React, { Component, Fragment } from "react";
import validator from "validator";
import * as userService from "../../service";
import { Navbar } from "./navbar";

export class Register extends Component {
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
  };
  userInfo =
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
  async componentDidMount() {
    if (this.userInfo) {
      await this.setState({ userInfo: JSON.parse(this.userInfo) });
    } else {
      alert("ابتدا باید وارد شوید");
      window.location.replace("/login");
    }
  }
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
      !this.state.emailTypeErr
    ) {
      await this.setState({ isValid: true });
      const user = JSON.parse(this.state.userInfo);
      const userInfo = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        token: user.token,
      };

      await userService
        .register(userInfo)
        .then((response) => {
          console.log("111");
          if (response.status === 400) {
            this.setState({ usernameAvailable: true });
            console.log("bbbb");
          }
        })
        .catch((error) => {
          console.log("2222");
          if (error.response.status === 400) {
            this.setState({ usernameAvailable: true });
            console.log("sss");
          }
        })
        .finally(() => console.log("end"));
    } else {
      await this.setState({ isValid: false });
    }
  }
  async validateFrom() {
    const username = await validator.isEmpty(this.state.username);
    const email = await validator.isEmpty(this.state.email);
    const password = await validator.isEmpty(this.state.password);
    const emailType = await validator.isEmail(this.state.email);

    if (username) {
      await this.setState({ usernameIsEmpty: true });
    } else await this.setState({ usernameIsEmpty: false });
    if (email) {
      await await this.setState({ emailIsEmpty: true });
    } else await this.setState({ emailIsEmpty: false });
    if (password) {
      await await this.setState({ passwordIsEmpty: true });
    } else await this.setState({ passwordIsEmpty: false });
    if (emailType) {
      await await this.setState({ emailTypeErr: false });
    } else await this.setState({ emailTypeErr: true });
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="wrapper wrapper-full-page">
          <div
            className="page-header register-page header-filter"
            filter-color="black"
            style={{ backgroundImage: "url('/img/02.jpg')" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-8 mx-auto my-auto">
                  <form
                    className="form "
                    method=""
                    action=""
                    onSubmit={this.submitHandler.bind(this)}
                  >
                    <div className="card card-login">
                      <div className="card-header card-header-success text-center">
                        <h4 className="card-title">عضویت</h4>
                      </div>
                      <div className="card-body pr-2 pl-4 ">
                        <span className="bmd-form-group">
                          <div className="input-group mt-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">face</i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="نام کاربری"
                              name="username"
                              onChange={this.changeHandler.bind(this)}
                            />
                          </div>
                          {this.state.usernameIsEmpty ? (
                            <small className="d-block text-danger text-center">
                              نام کاربری اجباری است.
                            </small>
                          ) : this.state.usernameAvailable ? (
                            <small className="d-block text-danger text-center">
                              این نام کاربری قبلاً ثبت شده است.
                            </small>
                          ) : (
                            ""
                          )}
                        </span>

                        <span className="bmd-form-group ">
                          <div className="input-group mt-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">email</i>
                              </span>
                            </div>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="ایمیل"
                              name="email"
                              onChange={this.changeHandler.bind(this)}
                            />
                          </div>
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
                        </span>
                        <span className="bmd-form-group">
                          <div className="input-group mt-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">lock_outline</i>
                              </span>
                            </div>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="رمز عبور"
                              name="password"
                              onChange={this.changeHandler.bind(this)}
                            />
                          </div>
                          {this.state.passwordIsEmpty ? (
                            <small className="d-block text-danger text-center">
                              رمز عبور اجباری است.
                            </small>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                      {this.state.usernameAvailable ? (
                        <small className="d-block text-danger text-center">
                          این نام کاربری قبلاً ثبت شده است.
                        </small>
                      ) : (
                        ""
                      )}
                      <div className="card-footer justify-content-center">
                        <button
                          className="btn btn-rose btn-link btn-lg"
                          type="submit"
                        >
                          عضویت
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <footer className="footer">
              <div className="container">
                <nav className="float-left">
                  <ul></ul>
                </nav>
                <div className="copyright float-right">
                  <a
                    href="http://tad-group.ir"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" طراحی وب سایت"}{" "}
                  </a>
                  {" توسط گروه"}{" "}
                  <a
                    href="http://tad-group.ir"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"تاد  "}{" "}
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </Fragment>
    );
  }
}
