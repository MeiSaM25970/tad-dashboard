import React, { Component } from "react";
import moment from "moment-jalaali";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

export class Contact extends Component {
  state = { contact: [], loading: true };
  changeHandler = async (event, value) => {
    await this.setState({ page: value });
    await this.fetchData();
  };
  async componentDidMount() {
    await this.fetchData();
  }

  fetchData() {
    userService
      .fetchContact()
      .then(async (res) => {
        await this.setState({ contact: res.data, loading: false });
      })
      .catch(() => this.props.history.push("/error"));
  }

  changeStatus(contact) {
    contact.status = false;
    userService
      .updateConcat(contact._id, contact)
      .then(() => this.fetchData())
      .catch((err) => console.log(err));
  }
  deleteContact(id) {
    userService
      .deleteContact(id)
      .then(() => this.fetchData())
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="content text-right">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-success card-header-icon">
                  <div className="card-icon">
                    <i className="material-icons">email</i>
                  </div>
                </div>
                <div className="card-body ir-r">
                  <MaterialTable
                    title="پیام ها"
                    columns={[
                      {
                        title: "نام و نام خانوادگی",
                        field: "fullName",
                        cellStyle: {
                          width: "20%",
                          textAlign: "center",
                        },
                      },
                      {
                        title: "ایمیل",
                        field: "email",
                        cellStyle: {
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
                        title: "پیام",
                        field: "message",
                        cellStyle: {
                          maxWidth: 200, // percentage also works
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                        },
                      },
                      {
                        title: "بررسی",
                        field: "status",
                        render: (contact) => (
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="status"
                                checked={!contact.status}
                                disabled={!contact.status}
                                onChange={() => this.changeStatus(contact)}
                              />
                              <span className="form-check-sign">
                                <span className="check"></span>
                              </span>
                            </label>
                          </div>
                        ),
                      },
                    ]}
                    data={this.state.contact}
                    actions={[
                      {
                        icon: () => (
                          <span className="material-icons">article</span>
                        ),
                        tooltip: "نمایش پیام",
                        onClick: (event, rowData) =>
                          this.props.history.push("/contact/" + rowData._id),
                      },
                      {
                        icon: "delete",
                        tooltip: "حذف پیام",
                        onClick: (event, contact) => {
                          confirmAlert({
                            customUI: ({ onClose }) => {
                              return (
                                <div className="custom-ui text-right ">
                                  <i className="material-icons-outlined">
                                    info
                                  </i>

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
                                      this.deleteContact(contact._id);
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
                      {
                        icon: "email",
                        tooltip: "پاسخ ",
                        onClick: (event, contact) => {
                          window.open(`mailto:${contact.email}`);
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
                      to="/contact"
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
