import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loading from "../loading";
import moment from "moment-jalaali";
import validator from "validator";
export class CommentDetail extends Component {
  state = {
    answer: "",
    editMode: false,
    isValid: false,
  };
  userInfo =
    JSON.parse(localStorage.getItem("userInfo")) ||
    JSON.parse(sessionStorage.getItem("userInfo"));
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const id = this.props.match.params.id;
    userService
      .findCommentById(id)
      .then((res) =>
        this.setState({ data: res.data, userInfo: this.userInfo })
      );
  }
  changeStatus(comment) {
    comment.status = "accept";
    userService
      .updateComments(comment._id, comment)
      .then(() => this.setState({ updated: true }))
      .catch((err) => console.log(err));
  }
  deleteComment() {
    const id = this.props.match.params.id;

    userService
      .deleteComment(id)
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/comments");
        } else console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  answerValidation() {
    const answerIsEmpty = validator.isEmpty(this.state.answer);
    if (answerIsEmpty) {
      this.setState({ answerErr: true });
    } else this.setState({ answerErr: false, isValid: true });
  }
  async saveAnswer() {
    await this.answerValidation();
    if (this.state.isValid) {
      const id = this.props.match.params.id;
      const answer = {
        answer: {
          answered: true,
          message: this.state.answer,
          adminInfo: {
            fullName:
              this.state.userInfo.firstName +
              " " +
              this.state.userInfo.lastName,
          },
        },
      };
      await userService
        .updateComments(id, answer)
        .then(() => this.fetchData())
        .catch((err) => console.log(err));
    }
  }
  async submitHandler(e) {
    await e.preventDefault();
    await this.saveAnswer();
    await this.setState({
      editMode: false,
      answered: true,
    });
  }
  render() {
    return this.state.data ? (
      <div
        className="content container text-right ir-r"
        style={{
          paddingTop: "75px",
          paddingBottom: "200px",
          marginTop: "140px",
        }}
      >
        <div className="col-md-12 ir-r">
          <div className="card ">
            <div className="card-header card-header-rose card-header-text">
              <div className="card-text">
                <h4 className="card-title ir-r">جزئیات نظر </h4>
              </div>
            </div>
            <div className="card-body ">
              <form
                method="get"
                action="/"
                className="form-horizontal"
                onSubmit={this.submitHandler.bind(this)}
              >
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
                    متن نظر:
                  </label>
                  <div className="col-sm-8">
                    <div className="form-group bmd-form-group">
                      <span className="ir-r">{this.state.data.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label ir-r order-detail-text-right">
                    وبلاگ مربوطه:
                  </label>
                  <div className="col-sm-8">
                    <div className="form-group bmd-form-group">
                      <span className="ir-r">
                        {this.state.data.weblogTitle}
                      </span>
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
                <div className="row">
                  <div className="col-sm-3 col-form-label ir-r order-detail-text-right">
                    <label className=" ">تایید نظر:</label>
                  </div>
                  <div className="form-check text-right mt-3">
                    <label className="form-check-label col-sm-8">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="status"
                        checked={this.state.data.status !== "new"}
                        disabled={this.state.data.status !== "new"}
                        onChange={() => this.changeStatus(this.state.data)}
                      />
                      <span className="form-check-sign">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>{" "}
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label ir-r order-detail-text-right">
                    پاسخ:
                  </label>
                  <div className="col-sm-6">
                    <div className="form-group bmd-form-group">
                      <textarea
                        type="tel"
                        className="form-control"
                        name="answer"
                        rows="2"
                        onChange={(e) => {
                          this.setState({ answer: e.target.value });
                        }}
                        disabled={
                          this.state.data.answer
                            ? this.state.data.answer.answered &&
                              !this.state.editMode
                            : this.state.editMode
                        }
                        defaultValue={
                          this.state.data.answer
                            ? this.state.data.answer.message
                            : ""
                        }
                      />
                    </div>
                  </div>
                  {!this.state.data.answer ? (
                    <div>
                      <button
                        to="#"
                        className="btn btn-success  ir-r"
                        type="submit"
                        disabled={validator.isEmpty(this.state.answer)}
                      >
                        ارسال پاسخ
                        <span className="material-icons ">done</span>
                      </button>
                    </div>
                  ) : this.state.editMode ? (
                    <div>
                      <button
                        to="#"
                        className="btn btn-success  ir-r"
                        type="submit"
                        disabled={validator.isEmpty(this.state.answer)}
                      >
                        <span className="material-icons ">done</span>
                        ارسال پاسخ
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="btn btn-primary ir-r"
                        onClick={() => {
                          this.setState({
                            editMode: true,
                          });
                        }}
                      >
                        <span className="material-icons">edit</span>
                        ویرایش پاسخ
                      </button>
                    </div>
                  )}
                </div>
                <div className="row mt-5 mb-4">
                  <div className="col-sm-8 mx-auto ir-r">
                    {/* <button
                      to="#"
                      className="btn btn-success  ir-r"
                      type="submit"
                      disabled={validator.isEmpty(this.state.answer)}
                    >
                      پاسخ
                    </button> */}
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
                                    this.deleteComment();
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
                    <Link className="btn btn-muted mr-3 ir-r" to="/comments">
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
