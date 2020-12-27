import React, { Component } from "react";
import validator from "validator";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loading from "../loading";
import { Link } from "react-router-dom";
export class Categories extends Component {
  state = {
    isValid: false,
    titleError: false,
    count: 1,
    addCategory: false,
    title: "",
    feature: [],
    editTitle: "",
    newCategoryErr: false,
    edit: null,
    loading: false,
    deleteLoading: false,
    updateLoading: false,
  };
  dangerClassName = "form-group bmd-form-group has-danger is-focused";
  normalClassName = "form-group bmd-form-group";
  featureClass = "col-sm-12 col-md-6 col-lg-4 ";
  history = this.props.history;
  fetchCategories() {
    userService
      .fetchCategories()
      .then(async (res) => {
        if (res.data[0]) {
          await this.setState({
            feature: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  }
  async addCategory() {
    const category = { title: this.state.title };
    await this.validation();
    if (this.state.isValid) {
      await userService
        .createCategories(category)
        .then(() => {
          this.fetchCategories();
          this.setState({ addCategory: false, title: "" });
        })
        .catch((err) => {
          this.configError();
          console.log(err);
        })
        .finally(() => this.setState({ loading: false }));
    } else await this.setState({ loading: false });
  }
  componentDidMount() {
    this.fetchCategories();
  }
  validation() {
    const titleIsEmpty = validator.isEmpty(this.state.title);
    if (titleIsEmpty) {
      this.setState({ titleError: true, isValid: false, loading: true });
    } else this.setState({ titleError: false, isValid: true });
  }
  async updateCategory(category) {
    const newCategoryIsEmpty = validator.isEmpty(this.state.editTitle);
    if (newCategoryIsEmpty) {
      await this.setState({ newCategoryErr: true, updateLoading: false });
    } else {
      await this.setState({ newCategoryErr: false });
      const newCategory = { title: this.state.editTitle };
      userService
        .updateCategory(category._id, newCategory)
        .then(async () => {
          await this.fetchCategories();
          await this.setState({ edit: null });
        })
        .catch((err) => {
          this.configError();
          console.log(err);
        })
        .finally(() => this.setState({ updateLoading: false }));
    }
  }

  changeHandler = (e) => {
    const category = {};
    const name = e.target.name;
    const value = e.target.value;
    category[name] = value;
    this.setState({ ...this.state, ...category });
  };
  deleteCategory(category) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui text-right ">
            <i className="material-icons-outlined">info</i>

            <h1 className="ir-r">مطمئنید؟</h1>

            <p className="ir-r">آیا شما میخواهید این موضوع را پاک کنید؟</p>
            <button className="btn btn-danger" onClick={onClose}>
              خیر
            </button>
            <button
              className="btn btn-success"
              onClick={async () => {
                await userService
                  .deleteCategory(category._id)
                  .then(async () => {
                    await this.setState({ feature: [] });
                    await this.fetchCategories();
                    onClose();
                  })
                  .catch(async (err) => {
                    await this.configError();
                    await onClose();
                    console.log(err);
                  })
                  .finally(() => this.setState({ deleteLoading: false }));
              }}
            >
              بله ، پاک کن!
            </button>
          </div>
        );
      },
    });
  }
  scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  async submitHandler(e) {
    await e.preventDefault();
    await this.setState({ loading: true });
    await e.target.reset();
    await this.addCategory();
  }
  configError() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui text-right text-danger ">
            <i className="material-icons-outlined">error</i>

            <p className="ir-r">خطا! دوباره امتحان کنید.</p>

            <button
              className="btn btn-danger"
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
  }
  render() {
    return this.state.feature ? (
      <div className="col-md-12 " style={{ marginTop: 100 }}>
        <div className="card ">
          <div className="card-header card-header-rose card-header-text text-right">
            <div className="card-text">
              <h4 className="card-title ir-r">مدیریت موضوعات</h4>
            </div>
          </div>
          <div className="card-body ">
            <form
              method="get"
              action="/"
              className="form-horizontal text-right"
              autoComplete="off"
              onSubmit={this.submitHandler.bind(this)}
            >
              <div className="row ">
                <label className="col-sm-2 col-form-label t-r"> موضوعات:</label>
                <div className="col-sm-10 ">
                  <div className="row mb-5">
                    <div
                      className={this.normalClassName + " mt-4  "}
                      style={{ overflowX: "auto" }}
                    >
                      <div className="card-body ">
                        <div className="table-responsive ">
                          <table className="table text-center ">
                            <thead className="">
                              <tr>
                                <th>ردیف</th>
                                <th className="c-w-200">موضوع</th>
                                <th>جزئیات</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.feature.length > 0 ? (
                                this.state.feature.map((feature, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      {this.state.edit === index ? (
                                        <div>
                                          <input
                                            type="text"
                                            className="form-control "
                                            name="editTitle"
                                            onChange={this.changeHandler.bind(
                                              this
                                            )}
                                            defaultValue={feature.title}
                                          />
                                          {this.state.newCategoryErr && (
                                            <small className="text-danger mr-2">
                                              فیلد را نمیتوان خالی گذاشت.
                                            </small>
                                          )}
                                        </div>
                                      ) : (
                                        feature.title
                                      )}
                                    </td>
                                    <td>
                                      {this.state.edit === index ? (
                                        <Link
                                          to="#"
                                          onClick={() =>
                                            this.setState({ edit: null })
                                          }
                                        >
                                          <i className="material-icons ">
                                            close
                                          </i>
                                        </Link>
                                      ) : (
                                        <Link
                                          className="text-info"
                                          onClick={() =>
                                            this.setState({ edit: index })
                                          }
                                          to="#"
                                        >
                                          <i className="material-icons ">
                                            {" "}
                                            edit
                                          </i>
                                        </Link>
                                      )}
                                    </td>
                                    <td>
                                      {this.state.edit === index ? (
                                        <Link
                                          className="text-success"
                                          onClick={() => {
                                            this.setState({
                                              updateLoading: true,
                                            });
                                            this.updateCategory(feature);
                                          }}
                                          to="#"
                                        >
                                          <span className="material-icons ">
                                            {this.state.updateLoading
                                              ? "hourglass_full"
                                              : "save"}
                                          </span>
                                        </Link>
                                      ) : (
                                        <Link
                                          className="text-danger"
                                          to="#"
                                          onClick={() => {
                                            this.setState({
                                              deleteLoading: true,
                                            });
                                            this.deleteCategory(feature);
                                          }}
                                        >
                                          <span className="material-icons ">
                                            {"delete"}
                                          </span>
                                        </Link>
                                      )}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td>موضوعی وجود ندارد.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {this.state.addCategory && (
                        <div>
                          <input
                            type="text"
                            className="form-control input-feature pr-2"
                            name="title"
                            onChange={this.changeHandler.bind(this)}
                          />
                          <div className="mx-auto d-block">
                            <button
                              className="btn btn-success mr-5"
                              type="submit"
                              disabled={this.state.loading}
                            >
                              {this.state.loading ? (
                                <Loading size={15} />
                              ) : (
                                "ذخیره"
                              )}
                            </button>
                            <button
                              className="btn btn-danger "
                              type="button"
                              onClick={() =>
                                this.setState({ addCategory: false })
                              }
                            >
                              لغو
                            </button>
                          </div>
                          {this.state.titleError && (
                            <small className="text-danger d-block mt-2">
                              نمیتوان موضوع جدید را خالی گذاشت.
                            </small>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      disabled={this.state.addCategory}
                      className="btn btn-primary "
                      onClick={() => this.setState({ addCategory: true })}
                    >
                      موضوع جدید
                    </button>
                    <Link to="/product" className="btn btn-mute mx-auto">
                      بازگشت
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div style={{ marginTop: 200 }} className="container">
        <div className=" d-block mx-auto" style={{ width: 50 }}>
          <Loading />
        </div>
      </div>
    );
  }
}
