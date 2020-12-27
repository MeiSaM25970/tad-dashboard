import React, { Component } from "react";
import moment from "moment-jalaali";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

export class Comments extends Component {
  state = { loading: true, comments: [] };
  componentDidMount() {
    this.setState({ comments: this.props.comments });
  }
  fetchComments() {
    userService
      .fetchComments()
      .then((res) => {
        this.setState({ comments: res.data });
      })
      .catch(() => this.props.history.push("/error"));
  }
  changeStatus(comment) {
    comment.status = "accept";
    userService
      .updateComments(comment._id, comment)
      .then(() => this.setState({ updated: true }))
      .catch((err) => console.log(err));
  }
  componentWillReceiveProps(newProps) {
    if (this.props.comments.length !== newProps.comments.length) {
      this.setState({ comments: newProps.comments });
    }
  }
  deleteComment(id) {
    userService
      .deleteComment(id)
      .then((res) => {
        if (res.status === 200) {
          this.fetchComments();
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="content text-right">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-rose card-header-icon">
                  <div className="card-icon">
                    <i className="material-icons">comment</i>
                  </div>
                </div>
                <div className="card-body ir-r">
                  <MaterialTable
                    localization={{
                      pagination: {
                        labelRowsSelect: "تعداد",
                      },
                    }}
                    title="نظرات"
                    columns={[
                      {
                        title: "نام و نام خانوادگی",
                        field: "fullName",
                        cellStyle: {
                          // width: "20%",
                          textAlign: "center",
                        },
                      },
                      {
                        title: "ایمیل",
                        field: "email",
                        cellStyle: {
                          maxWidth: 200, // percentage also works
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                        },
                      },
                      {
                        title: "تاریخ",
                        field: "date",
                        render: (contact) => (
                          <div>
                            {moment(contact.date, "YYYY/MM/DD HH:mm:ss").format(
                              "jYYYY/jM/jD"
                            )}
                          </div>
                        ),
                      },
                      {
                        title: "وبلاگ",
                        field: "weblogTitle",
                        cellStyle: {
                          maxWidth: 150, // percentage also works
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                        },
                      },

                      {
                        title: "نظر",
                        field: "message",
                        cellStyle: {
                          maxWidth: 100, // percentage also works
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                        },
                      },
                      {
                        title: "تایید نظر",
                        cellStyle: {
                          textAlign: "right",
                        },
                        field: "status",
                        render: (commend) => (
                          <div className="form-check text-right">
                            <label className="form-check-label">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="status"
                                checked={commend.status !== "new"}
                                disabled={commend.status !== "new"}
                                onChange={() => this.changeStatus(commend)}
                              />
                              <span className="form-check-sign">
                                <span className="check"></span>
                              </span>
                            </label>
                          </div>
                        ),
                      },
                    ]}
                    data={this.state.comments}
                    actions={[
                      {
                        icon: () => (
                          <span className="material-icons">article</span>
                        ),
                        tooltip: "نمایش پیام",
                        onClick: (event, rowData) =>
                          this.props.history.push("/comment/" + rowData._id),
                      },
                      {
                        icon: "delete",
                        tooltip: "حذف پیام",
                        onClick: (event, comment) => {
                          confirmAlert({
                            customUI: ({ onClose }) => {
                              return (
                                <div className="custom-ui text-right ">
                                  <i className="material-icons-outlined">
                                    info
                                  </i>

                                  <h1 className="ir-r">مطمئنید؟</h1>

                                  <p className="ir-r">
                                    آیا شما میخواهید این نظر را پاک کنید؟
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
                                      this.deleteComment(comment._id);
                                      onClose();
                                    }}
                                  >
                                    بله ، پاک کن!
                                  </button>
                                </div>
                              );
                            },
                          });
                        },
                      },
                    ]}
                    // style={{ textAlign: "center" }}
                    options={{
                      cellStyle: {
                        textAlign: "center",
                      },
                      rowStyle: {
                        textAlign: "center",
                      },
                      paginationPosition: "bottom",
                      paginationType: "stepped",
                    }}
                  />
                  <div className="row d-block text-left">
                    <Link
                      className="btn btn-muted mr-3  mt-4 ir-r "
                      to="/dashboard"
                    >
                      بازگشت
                    </Link>
                  </div>
                </div>
                {/* <!-- end content--> */}
              </div>
              {/* <!--  end card  --> */}
            </div>
            {/* <!-- end col-md-12 --> */}
          </div>
          {/* <!-- end row --> */}
        </div>
      </div>
    );
  }
}
