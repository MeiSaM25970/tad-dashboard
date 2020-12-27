import React, { Component, Fragment } from "react";
import * as userService from "../../service";
import validator from "validator";
import { Navbar } from "./navbar";
import Loading from "../loading";
import { Redirect } from "react-router-dom";
import { loginUser, loginUserStore } from "./redux";
export class Login extends Component {
  state = {
    username: "",
    password: "",
    usernameIsEmpty: false,
    passwordIsEmpty: false,
    isValid: false,
    passwordWrong: false,
    usernameWrong: false,
    remember: false,
    loading: false,
    redirect: false,
  };
  userInfo =
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");

  changeHandler(e) {
    const userInfo = {};
    const name = e.target.name;
    const value = e.target.value;
    userInfo[name] = value;
    this.setState({ ...this.state, ...userInfo });
  }

  async submitHandler(e) {
    await e.preventDefault();
    await this.setState({ loading: true });
    await this.validateFrom();
    if (!this.state.passwordIsEmpty && !this.state.usernameIsEmpty) {
      await this.setState({ isValid: true });
      const userInfo = {
        username: this.state.username,
        password: this.state.password,
      };

      await userService
        .login(userInfo)
        .then(async (response) => {
          this.setState({ loading: false });
          if (this.state.remember) {
            await localStorage.setItem(
              "userInfo",
              JSON.stringify(response.data)
            );
            await loginUserStore.dispatch(loginUser(response.data));

            await this.setState({ redirect: true });
          } else {
            await sessionStorage.setItem(
              "userInfo",
              JSON.stringify(response.data)
            );
            await loginUserStore.dispatch(loginUser(response.data));

            await this.setState({ redirect: true });
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              this.setState({ passwordWrong: true, loading: false });
            } else {
              if (error.response.status === 404) {
                this.setState({ usernameWrong: true, loading: false });
              } else console.log({ msg: "خطای اتصال با سرور" });
              this.setState({ loading: false });
            }
          } else {
          }
        });
    } else {
      await this.setState({ isValid: false });
    }
  }
  async validateFrom() {
    const username = await validator.isEmpty(this.state.username);
    const password = await validator.isEmpty(this.state.password);

    if (username) {
      await this.setState({ usernameIsEmpty: true, loading: false });
    } else await this.setState({ usernameIsEmpty: false });

    if (password) {
      await await this.setState({ passwordIsEmpty: true, loading: false });
    } else await this.setState({ passwordIsEmpty: false });
  }
  render() {
    if (this.state.redirect || this.userInfo) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <Fragment>
          <Navbar />
          <div className="wrapper wrapper-full-page">
            <div
              className="page-header login-page header-filter"
              filter-color="black"
              style={{
                backgroundImage: " url('/img/01.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
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
                        <div className="card-header card-header-rose text-center">
                          <h4 className="card-title">ورود</h4>
                        </div>
                        <div className="card-body pr-2 pl-4">
                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">
                                    phonelink_ring
                                  </i>
                                </span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="mobile"
                                name="username"
                                onChange={this.changeHandler.bind(this)}
                              />
                            </div>
                            {this.state.usernameIsEmpty ? (
                              <small className="d-block text-danger text-center">
                                نام کاربری اجباری است.
                              </small>
                            ) : (
                              ""
                            )}
                          </span>
                          <span className="bmd-form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">lock_outline</i>
                                </span>
                              </div>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="کلمه عبور"
                                name="password"
                                onChange={this.changeHandler.bind(this)}
                              />
                            </div>
                            {this.state.passwordIsEmpty ? (
                              <small className="d-block text-danger text-center">
                                کلمه عبور اجباری است.
                              </small>
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                        <div className="form-check d-block text-right">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="remember"
                              onClick={() =>
                                this.setState({
                                  remember: !this.state.remember,
                                })
                              }
                            />
                            <span className="form-check-sign">
                              <span className="check"></span>
                            </span>
                          </label>
                          <div
                            className="d-block"
                            style={{
                              position: "absolute",
                              right: "60px",
                              top: "10px",
                            }}
                          >
                            {" من را بخاطر بسپار"}
                          </div>
                        </div>
                        {this.state.usernameWrong ? (
                          <small className="d-block text-danger text-center">
                            نام کاربری ثبت نشده است.
                          </small>
                        ) : this.state.passwordWrong ? (
                          <small className="d-block text-danger text-center">
                            کلمه عبور اشتباه است.
                          </small>
                        ) : (
                          ""
                        )}
                        <div className="card-footer justify-content-center">
                          <button
                            disabled={this.state.loading}
                            type="submit"
                            className="btn btn-rose btn-link btn-lg"
                          >
                            {this.state.loading ? <Loading /> : "ورود"}
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
}
