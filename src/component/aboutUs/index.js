import React, { Component } from "react";
import validator from "validator";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link } from "react-router-dom";
import Loading from "../loading";
import { API_ADDRESS_SERVICE } from "../../env";
import { Editor } from "@tinymce/tinymce-react";

export class AboutUs extends Component {
  state = {
    imgPath: "",
    title: "",
    description: "",
    titleIsEmpty: false,
    descriptionIsEmpty: false,
    isValid: false,
    imgError: false,
    edit: false,
    enableSave: false,
  };
  constructor(props) {
    super(props);
    this.uploadedImage = React.createRef(null);
    this.imageUploader = React.createRef(null);
  }
  changeHandler(e) {
    const text = {};
    const name = e.target.name;
    const value = e.target.value;
    text[name] = value;
    this.setState({ ...this.state, ...text, enableSave: true });
  }
  componentDidMount() {
    userService
      .fetchAbout()
      .then((res) => {
        if (
          res.data.length > 0 &&
          res.data[0].title &&
          res.data[0].description &&
          res.data[0].imgPath
        ) {
          this.setState({
            title: res.data[0].title,
            description: res.data[0].description,
            imgPath: res.data[0].imgPath,
            _id: res.data[0]._id,
            edit: true,
          });
        } else this.setState({ new: true });
      })
      .catch((err) => console.log(err))
      .finally(() => console.log(this.state));
  }
  async submitHandler(e) {
    await e.preventDefault();
    await this.setState({ loading: true });
    await this.validateFrom();
    if (this.state.isValid) {
      const about = {
        title: this.state.title,
        description: this.state.description,
        imgPath: this.state.imgPath,
      };
      if (!this.state.edit) {
        userService
          .createAbout(about)
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
            this.configError();
            console.log(error);
          })
          .finally(() => this.setState({ loading: false }));
      } else {
        about._id = this.state._id;
        userService
          .updateAbout(this.state._id, about)
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
            this.configError();
            console.log(error);
          })
          .finally(() => this.setState({ loading: false }));
      }
    } else {
      this.setState({ loading: false, isValid: false });
    }
  }
  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!e.target.files.length && !this.state.edit) {
      this.setState({ imgError: true, loading: false });
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
      .uploadImage(uploadData)
      .then((res) => this.setState({ imgPath: res.data.path }))
      .catch((e) => {
        console.log(e);
        this.setState({ loading: false });
      });
  }
  async validateFrom() {
    const title = await validator.isEmpty(this.state.title);
    const description = await validator.isEmpty(this.state.description);
    debugger;
    if (title) {
      await this.setState({ titleIsEmpty: true, loading: false });
    } else await this.setState({ titleIsEmpty: false });
    if (description) {
      await this.setState({ descriptionIsEmpty: true, loading: false });
    } else await this.setState({ descriptionIsEmpty: false });
    if (this.state.img) {
      await this.setState({ imgError: false });
      await this.uploadFile();
    } else if (this.state.edit && !validator.isEmpty(this.state.imgPath)) {
      this.setState({ imgError: false });
    } else this.setState({ imgError: true, loading: false });
    if (!title && !description && !this.state.imgError) {
      this.setState({ isValid: true });
    } else this.setState({ isValid: false, loading: false });
  }
  handleEditorChange = (content, editor) => {
    this.setState({ description: content, enableSave: true });
  };
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
    return (
      <div className="content ir-r text-right">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-icon card-header-primary">
                  <div className="card-icon">
                    <i className="material-icons">info</i>
                  </div>
                  <h4 className="card-title ir-r">درباره ما</h4>
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
                              !validator.isEmpty(this.state.imgPath)
                                ? API_ADDRESS_SERVICE + this.state.imgPath
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
                        {!this.state.edit && this.state.imgError ? (
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
                            defaultValue={this.state.title}
                          />
                        </div>
                        {this.state.titleIsEmpty ? (
                          <small className="d-block text-danger text-center">
                            وارد نمودن عنوان اجباری است.
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <Editor
                          initialValue={
                            this.state.description ? this.state.description : ""
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
                      {this.state.descriptionIsEmpty ? (
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
                      disabled={this.state.loading || !this.state.enableSave}
                    >
                      {this.state.loading ? <Loading size={15} /> : " ذخیره"}
                    </button>
                    <Link to="/dashboard">
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
    );
  }
}
