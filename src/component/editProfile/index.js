import React, { Component } from "react";
import { loginUserStore } from "../Login/redux";
import * as userService from "../../service";
import { Link } from "react-router-dom";
import { API_ADDRESS_SERVICE } from "../../env";
import validator from "validator";
import Loading from "../loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.uploadedImage = React.createRef(null);
    this.imageUploader = React.createRef(null);
  }
  state = {
    img: [],
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
    },
    emailIsEmptyErr: false,
    emailTypeErr: false,
    firstNameIsEmptyErr: false,
    lastNameISEmptyErr: false,
    loading: false,
    disableButton: true,
  };
  async getUserInfo() {
    const userInfoInStorage =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    await this.setState({ userInfoInStorage: JSON.parse(userInfoInStorage) });
    userService
      .fetchUserInfo(this.state.userInfoInStorage.username)
      .then((res) => {
        this.setState({ userInfo: res.data, loading: false });
      })
      .finally(() => this.createNewUserInfo());
  }
  componentDidMount() {
    this.unsubscribe = loginUserStore.subscribe(() => {
      const arrayNumber = loginUserStore.getState().length;
      this.setState({
        userInfoInStorage: loginUserStore.getState()[arrayNumber - 1],
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
  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!e.target.files.length) {
      this.setState({ imgError: true });
    } else {
      this.setState({
        disableButton: false,
        img: file,
        imgError: false,
        imageUpload: true,
      });
    }
    if (file) {
      const reader = new FileReader();
      const { current } = this.uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  async uploadFile() {
    const uploadData = new FormData();

    uploadData.append("myFile", this.state.img, this.state.img.name);

    await userService
      .uploadUserImg(uploadData)
      .then((res) =>
        this.setState({
          newUserInfo: { ...this.state.newUserInfo, imgPath: res.data.path },
        })
      )
      .catch((e) => {
        console.log(e);
        this.setState({ loading: false });
      });
  }
  createNewUserInfo() {
    this.setState({
      newUserInfo: { ...this.state.newUserInfo, _id: this.state.userInfo._id },
    });
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
    this.setState({
      newUserInfo: { ...this.state.newUserInfo, isComplete: false },
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

                  <p className="ir-r">
                    اطلاعات شما با موفقیت ذخیره شد لطفا دوباره وارد شوید.
                  </p>

                  <button
                    className="btn btn-success"
                    onClick={() => {
                      onClose();
                      this.logout();
                    }}
                  >
                    باشه
                  </button>
                </div>
              );
            },
          });
        });
    }
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
    if (this.state.img.length === 0 && !this.state.userInfo.imgPath) {
      await this.setState({ imgError: true, loading: false });
    } else {
      if (this.state.img.length === 0) {
        this.setState({
          newUserInfo: {
            ...this.state.newUserInfo,
            imgPath: this.state.userInfo.imgPath,
          },
        });
      } else {
        await this.setState({ imgError: false });
        await this.uploadFile();
      }
    }
    if (
      !emailIsEmpty &&
      emailType &&
      !firstNameIsEmpty &&
      !lastNameIsEmpty &&
      this.state.newUserInfo.imgPath
    ) {
      await this.setState({
        newUserInfo: { ...this.state.newUserInfo, isComplete: true },
      });
    } else
      this.setState({
        newUserInfo: { ...this.state.newUserInfo, isComplete: false },
      });
  }
  async logout() {
    this.userInfo = localStorage.clear() || sessionStorage.clear();
    window.location.replace("/login");
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
                  <h4 className="card-title ir-r">
                    پروفایل من -
                    {!this.state.userInfo.isComplete ? (
                      <small className="category">
                        پروفایل خود را تکمیل کنید
                      </small>
                    ) : (
                      <small className="category">{this.fullName}</small>
                    )}
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={this.submitHandler.bind(this)}>
                    <div className="row">
                      <div
                        style={{
                          display: "block",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "auto",
                        }}
                        className="mx-auto"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={this.handleImageUpload.bind(this)}
                          ref={this.imageUploader}
                          style={{
                            display: "none",
                          }}
                        />
                        <div onClick={() => this.imageUploader.current.click()}>
                          <img
                            src={
                              this.state.userInfo.imgPath
                                ? API_ADDRESS_SERVICE +
                                  this.state.userInfo.imgPath
                                : "/assets/img/placeholder.jpg"
                            }
                            ref={this.uploadedImage}
                            className="mx-auto d-block"
                            alt="تصویر"
                            style={{
                              width: "100px",
                              position: "relative",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        {this.state.imgError ? (
                          <div className="mt-3 text-danger text-center">
                            {"انتخاب تصویر اجباری است."}
                          </div>
                        ) : !this.state.imageUpload ? (
                          <div className="mt-3 text-warning text-center">
                            {" تصویر خود را انتخاب کنید."}
                          </div>
                        ) : (
                          <div className="text-success mt-3 text-center">
                            تصویر با موفقیت انتخاب شد.
                          </div>
                        )}
                      </div>
                    </div>

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
                          disabled={this.state.disableButton}
                        >
                          {this.state.loading ? (
                            <Loading size={15} />
                          ) : (
                            " ذخیره"
                          )}
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
      </div>
    );
  }
}
