import React, { Component } from "react";
import validator from "validator";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link } from "react-router-dom";
import Loading from "../loading";

import { API_ADDRESS_SERVICE } from "../../env";

import { Editor } from "@tinymce/tinymce-react";

export class EditWeblog extends Component {
  state = {
    imgPath: "",
    title: "",
    description: "",
    littleDes: "",
    category: "",
    littleDesIsEmpty: false,
    titleIsEmpty: false,
    descriptionIsEmpty: false,
    isValid: false,
    img: [],
    imgError: false,
    edit: false,
    categoryIsEmpty: false,
    categories: null,
    editMode: false,
    editWeblog: {
      imgPath: "",
      title: "",
      description: "",
      littleDes: "",
      category: "",
    },
    findCategory: {},
    enableSave: false,
    fieldErr: "",
  };
  constructor(props) {
    super(props);
    this.uploadedImage = React.createRef(null);
    this.imageUploader = React.createRef(null);
  }

  async changeHandler(e) {
    const text = {};
    const name = e.target.name;
    const value = e.target.value;
    text[name] = value;
    await this.setState({ ...this.state, ...text, enableSave: true });
    if (validator.isEmpty(text[name])) {
      this.setState({ enableSave: false, isValid: false, fieldErr: name });
    } else {
      this.setState({ enableSave: true, isValid: true, fieldErr: "" });
    }
  }
  userInfo = null;
  async componentDidMount() {
    await this.fetchCategories();
    this.userInfo =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    this.userInfo = JSON.parse(this.userInfo);
    if (
      this.props.location.pathname ===
      "/weblogs/" + this.props.match.params.id
    ) {
      await this.setState({ editMode: true });

      await userService
        .findWeblogById(this.props.match.params.id)
        .then(async (res) => {
          await this.setState({ editWeblog: res.data });
          var findCategory = this.state.categories.find(
            (category) => category._id === res.data.category
          );
          await this.setState({ findCategory });
        })
        .catch((err) => console.log(err));
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      this.setState({ editMode: false, editWeblog: {} });
    }
  }
  fetchCategories() {
    userService
      .fetchCategories()
      .then((res) => this.setState({ categories: res.data }))
      .catch((err) => console.log(err));
  }
  async submitHandler(e) {
    await e.preventDefault();
    await this.setState({ loading: true });
    await this.validateFrom();
    if (this.state.isValid) {
      if (!this.state.editMode) {
        await this.uploadFile();
      }

      const weblog = {
        title: this.state.title,
        littleDes: this.state.littleDes,
        category: this.state.category,
        description: this.state.description,
        imgPath: this.state.imgPath,
        adminInfo: {
          fullName: this.userInfo.firstName + " " + this.userInfo.lastName,
          imgPath: this.userInfo.imgPath,
          _id: this.userInfo._id,
        },
      };
      if (!this.state.editMode) {
        if (!validator.isEmpty(this.state.imgPath)) {
          userService
            .createWeblog(weblog)
            .then((response) => {
              if (response.status === 200) {
                this.setState({ enableSave: false });
                confirmAlert({
                  customUI: ({ onClose }) => {
                    return (
                      <div className="custom-ui text-right ">
                        <i className="material-icons-outlined">done</i>
                        <p className="ir-r">مقاله شما با موفقیت ذخیره شد.</p>
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
              } else console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        const weblogId = this.props.match.params.id;
        if (
          !this.state.categoryIsEmpty &&
          !this.state.descriptionIsEmpty &&
          !this.state.imgError &&
          !this.state.littleDesIsEmpty &&
          !this.state.titleIsEmpty
        ) {
          userService
            .updateWeblog(weblogId, weblog)
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
                          onClick={async () => {
                            await this.setState({ enableSave: false });
                            await onClose();
                            await this.props.history.push("/weblogs");
                          }}
                        >
                          باشه
                        </button>
                      </div>
                    );
                  },
                });
              } else console.log(response.data);
            })
            .catch((error) => {
              this.configError();
              console.log(error);
            })
            .finally(() => this.setState({ loading: false }));
        }
      }
    } else {
      this.setState({ loading: false, isValid: false });
    }
  }
  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!e.target.files.length) {
      this.setState({ imgError: true });
    } else {
      this.setState({
        img: file,
        imgError: false,
        imageUpload: true,
        enableSave: true,
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
      .uploadWeblogImg(uploadData)
      .then((res) => this.setState({ imgPath: res.data.path }))
      .catch((e) => {
        console.log(e);
        this.setState({ loading: false });
      });
  }
  async validateFrom() {
    const title = await validator.isEmpty(this.state.title);
    const description = await validator.isEmpty(this.state.description);
    const littleDes = await validator.isEmpty(this.state.littleDes);
    const category = await validator.isEmpty(this.state.category);
    if (title) {
      if (this.state.editMode) {
        this.setState({
          title: this.state.editWeblog.title,
        });
      } else await this.setState({ titleIsEmpty: true, loading: false });
    } else await this.setState({ titleIsEmpty: false });
    if (description) {
      if (this.state.editMode) {
        this.setState({
          description: this.state.editWeblog.description,
        });
      } else await this.setState({ descriptionIsEmpty: true, loading: false });
    } else await this.setState({ descriptionIsEmpty: false });
    if (littleDes) {
      if (this.state.editMode) {
        this.setState({
          littleDes: this.state.editWeblog.littleDes,
        });
      } else await this.setState({ littleDesIsEmpty: true, loading: false });
    } else await this.setState({ littleDesIsEmpty: false });
    if (category) {
      if (this.state.editMode) {
        this.setState({
          category: this.state.editWeblog.category,
        });
      } else await this.setState({ categoryIsEmpty: true, loading: false });
    } else await this.setState({ categoryIsEmpty: false });

    if (this.state.img.length === 0) {
      if (this.state.editMode) {
        this.setState({ imgPath: this.state.editWeblog.imgPath });
      } else await this.setState({ imgError: true, loading: false });
    } else {
      if (this.state.editMode) {
        await this.uploadFile();
      } else await this.setState({ imgError: false });
    }

    if (
      !this.state.editMode &&
      !title &&
      !description &&
      !littleDes &&
      !category
    ) {
      this.setState({ isValid: true });
    } else {
      if (this.state.editMode) {
        this.setState({ isValid: true });
      } else this.setState({ isValid: false, loading: false });
    }
  }

  handleEditorChange = (content, editor) => {
    this.setState({ description: content, enableSave: true });
    if (validator.isEmpty(content)) {
      this.setState({
        enableSave: false,
        isValid: false,
        fieldErr: "description",
      });
    } else {
      this.setState({ enableSave: true, isValid: true, fieldErr: "" });
    }
  };
  async selectHandler(e) {
    await this.setState({ category: e.target.value, enableSave: true });
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
    return this.state.categories ? (
      <div className="content ir-r text-right">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-icon card-header-rose">
                  <div className="card-icon">
                    <i className="material-icons">text_snippet</i>
                  </div>
                  <h4 className="card-title ir-r">وبلاگ</h4>
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
                              this.state.editMode &&
                              !validator.isEmpty(this.state.editWeblog.imgPath)
                                ? API_ADDRESS_SERVICE +
                                  this.state.editWeblog.imgPath
                                : "/img/uploadImage.png"
                            }
                            ref={this.uploadedImage}
                            className="mx-auto d-block"
                            alt="تصویر"
                            style={{
                              width: "50%",
                              maxHeight: 300,
                              position: "relative",
                            }}
                          />
                        </div>
                        {!this.state.editMode && this.state.imgError ? (
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
                      <div className="col-md-4 mt-auto">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">عنوان:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            onChange={this.changeHandler.bind(this)}
                            defaultValue={
                              this.state.editMode
                                ? this.state.editWeblog.title
                                : ""
                            }
                          />
                        </div>
                        {this.state.titleIsEmpty ||
                        this.state.fieldErr === "title" ? (
                          <small className="d-block text-danger text-center">
                            وارد نمودن عنوان اجباری است.
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8 mt-auto">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            توضیح کوتاه:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="littleDes"
                            onChange={this.changeHandler.bind(this)}
                            defaultValue={
                              this.state.editMode
                                ? this.state.editWeblog.littleDes
                                : ""
                            }
                            maxLength="70"
                          />
                        </div>
                        {this.state.littleDesIsEmpty ||
                        this.state.fieldErr === "littleDes" ? (
                          <small className="d-block text-danger text-center">
                            وارد نمودن توضیح کوتاه اجباری است.
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="row text-right">
                      <div className="col-lg-5 col-md-6 col-sm-3 ">
                        <div className="form-group ">
                          <label
                            htmlFor="exampleFormControlSelect1"
                            className="bmd-label-floating"
                          >
                            موضوع مقاله:
                          </label>
                          <select
                            onChange={this.selectHandler.bind(this)}
                            className="form-control "
                            style={{ position: "relative" }}
                            id="exampleFormControlSelect1"
                            defaultValue={
                              this.state.editMode && this.state.findCategory
                                ? this.state.editWeblog.category
                                : ""
                            }
                          >
                            {this.state.editMode && this.state.findCategory ? (
                              <option disabled={true}>
                                {this.state.findCategory.title}
                              </option>
                            ) : (
                              <option value="1">موضوع را انتخاب کنید.</option>
                            )}
                            {this.state.categories ? (
                              this.state.categories.map((category, index) => {
                                if (
                                  this.state.editMode &&
                                  this.state.findCategory
                                ) {
                                  if (
                                    this.state.findCategory._id !== category._id
                                  ) {
                                    return (
                                      <option value={category._id} key={index}>
                                        {category.title}
                                      </option>
                                    );
                                  } else return null;
                                } else
                                  return (
                                    <option value={category._id} key={index}>
                                      {category.title}
                                    </option>
                                  );
                              })
                            ) : (
                              <option disabled value="2">
                                دسته ای وجود ندارد.
                              </option>
                            )}
                          </select>
                        </div>
                      </div>
                      {this.state.categoryIsEmpty ? (
                        <div className="col-md-6 mt-5 text-danger">
                          <span>برای مقاله خود یک موضوع انتخاب کنید.</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-12">
                        <Editor
                          initialValue={
                            this.state.editMode
                              ? this.state.editWeblog.description
                              : ""
                          }
                          init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar: `undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help`,
                          }}
                          onEditorChange={this.handleEditorChange}
                        />
                      </div>
                      {this.state.descriptionIsEmpty ||
                      this.state.fieldErr === "description" ? (
                        <div className="col-md-6 mt-5 text-danger">
                          <span>توضیحات را نمیتوان خالی گذاشت.</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-rose pull-right"
                      disabled={!this.state.enableSave}
                    >
                      {this.state.loading ? <Loading size={15} /> : " ذخیره"}
                    </button>
                    <Link to="/weblogs">
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
    ) : (
      <div style={{ marginTop: 200 }} className="container">
        <div className=" d-block mx-auto" style={{ width: 50 }}>
          <Loading />
        </div>
      </div>
    );
  }
}
