import React, { Component } from "react";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { API_ADDRESS_SERVICE } from "../../env";

export class Users extends Component {
  state = { loading: true, users: [], usersNotFound: false };
  userInfo =
    JSON.parse(localStorage.getItem("userInfo")) ||
    JSON.parse(sessionStorage.getItem("userInfo"));
  componentDidMount() {
    this.fetchUsers(this.userInfo.username);
  }
  fetchUsers(username) {
    userService
      .fetchUsers(username)
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ usersNotFound: true });
        }
      });
  }

  deleteUsers(user) {
    userService
      .deleteUser(this.userInfo.username, user._id)
      .then((res) => {
        if (res.status === 200) {
          this.fetchUsers(this.userInfo.username);
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
                    <i className="material-icons">supervisor_account</i>
                  </div>
                </div>
                <div className="card-body ir-r">
                  {this.state.usersNotFound ? (
                    <h2 className="ir-r mt-5 mb-5 text-center">
                      کاربری یافت نشد.
                    </h2>
                  ) : (
                    <MaterialTable
                      localization={{
                        pagination: {
                          labelRowsSelect: "تعداد",
                        },
                      }}
                      title="کاربران"
                      columns={[
                        {
                          render: (user) => (
                            <img
                              src={
                                user.imgPath
                                  ? API_ADDRESS_SERVICE + user.imgPath
                                  : "/assets/img/User-Icon.png"
                              }
                              alt="/assets/img/User-Icon.png"
                              width="75"
                              className="rounded-circle"
                            />
                          ),
                        },
                        {
                          title: "نام ",
                          field: "firstName",
                          cellStyle: {
                            width: "10%",
                            textAlign: "center",
                          },
                        },
                        {
                          title: " نام خانوادگی",
                          field: "lastName",
                          cellStyle: {
                            // width: "20%",
                            textAlign: "center",
                          },
                        },
                        {
                          title: " نام کاربری",
                          field: "username",
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
                      ]}
                      data={this.state.users}
                      actions={[
                        {
                          icon: "edit",
                          tooltip: "ویرایش",
                          onClick: (event, rowData) =>
                            this.props.history.push(
                              "/manageProfile/" + rowData.username
                            ),
                        },
                        {
                          icon: "delete",
                          tooltip: "حذف کاربر",
                          onClick: (event, user) => {
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
                                        this.deleteUsers(user);
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
                  )}
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
