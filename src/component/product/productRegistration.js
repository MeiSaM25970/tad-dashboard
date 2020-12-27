import React, { Component } from "react";
import validator from "validator";
import * as userService from "../../service";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { productStore } from "./redux/store";
import { addProduct } from "./redux/actions";
import Loading from "../loading";
import { Link } from "react-router-dom";
export class ProductRegistration extends Component {
  constructor(props) {
    super(props);
    this.uploadedImage = React.createRef(null);
    this.imageUploader = React.createRef(null);
  }

  state = {
    img: [],
    newProduct: "",
    price: "",
    description: ``,
    featureDesErr: false,
    productError: false,
    priceError: false,
    imgError: false,
    descriptionError: false,
    isValid: false,
    imageUpload: false,
    titleError: false,
    count: 1,
    deleteErr: false,
    imgPath: "",
    isDone: false,
    disableButton: true,
  };
  dangerClassName = "form-group bmd-form-group has-danger is-focused";
  normalClassName = "form-group bmd-form-group";
  featureClass = "col-sm-12 col-md-6 col-lg-4 ";
  history = this.props.history;
  submitHandler = async (e) => {
    await e.preventDefault();
    this.setState({ loading: true });
    await this.productValidation();
    await this.featureValidation();
    if (
      !this.state.productError &&
      !this.state.priceError &&
      !this.state.imgError &&
      !this.state.descriptionError &&
      !this.state.featureDesErr &&
      !this.state.titleError
    ) {
      await this.setState({ isValid: true });
      await this.uploadFile();
      const product = {
        title: this.state.newProduct,
        price: this.state.price,
        description: this.state.description,
        img: this.state.imgPath,
        feature: this.feature,
      };
      userService
        .createProduct(product)
        .then((res) => {
          this.setState({ loading: false });
          if (res.status === 200) {
            confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <div className="custom-ui text-right ">
                    <i className="material-icons-outlined">done</i>

                    <p className="ir-r">اطلاعات شما با موفقیت ذخیره شد.</p>

                    <button
                      className="btn btn-success"
                      onClick={async () => {
                        await productStore.dispatch(addProduct(product));
                        await onClose();
                        await this.props.history.push("/product");
                      }}
                    >
                      باشه
                    </button>
                  </div>
                );
              },
            });
          } else {
            console.log("fail");
          }
        })
        .catch(() => this.setState({ isDone: false }));
    } else await this.setState({ isValid: false });
    if (!this.state.isValid) {
      this.scrollTop();
    }
  };
  feature = [{ title: "", description: `` }];
  countPlus() {
    this.feature.push({ title: "", description: `` });
    this.setState({ count: +this.state.count + 1 });
  }
  deleteCount() {
    if (this.state.count > 1) {
      let lastArrayNum = this.feature.length - 1;
      this.feature.splice(lastArrayNum);
      this.setState({ count: this.state.count - 1 });
    } else {
      alert("حداقا باید یک ویژگی وجود داشته باشد.");
    }
  }
  changeHandler = (e) => {
    const product = {};
    const name = e.target.name;
    const value = e.target.value;
    product[name] = value;
    this.setState({ ...this.state, ...product, disableButton: false });
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
  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!e.target.files.length) {
      this.setState({ imgError: true });
    } else {
      this.setState({
        img: file,
        imgError: false,
        imageUpload: true,
        disableButton: false,
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
  productValidation = async () => {
    const product = await validator.isEmpty(this.state.newProduct);
    const price = await validator.isEmpty(this.state.price);
    const description = await validator.isEmpty(this.state.description);

    if (product) {
      await this.setState({ productError: true, loading: false });
    } else await this.setState({ productError: false });
    if (price) {
      await await this.setState({ priceError: true, loading: false });
    } else await this.setState({ priceError: false });
    if (description) {
      await await this.setState({ descriptionError: true, loading: false });
    } else await this.setState({ descriptionError: false });
    if (this.state.img.length === 0) {
      await this.setState({ imgError: true, loading: false });
    } else {
      await this.setState({ imgError: false });
    }
  };
  featureValidation = async () => {
    for (var i = 0; i < this.feature.length; i++) {
      const title = await validator.isEmpty(this.feature[i].title);
      const description = await validator.isEmpty(this.feature[i].description);
      if (title) {
        await this.setState({ titleError: true, loading: false });
      } else await this.setState({ titleError: false });
      if (description) {
        await await this.setState({ featureDesErr: true, loading: false });
      } else await this.setState({ featureDesErr: false });
    }
  };
  scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  render() {
    return (
      <div className="col-md-12 ir-r " style={{ marginTop: 100 }}>
        <div className="card ">
          <div className="card-header card-header-rose card-header-text text-right">
            <div className="card-text">
              <h4 className="card-title ir-r">ثبت محصول</h4>
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
                      src="/img/uploadImage.png"
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
                <label className="col-sm-2 col-form-label t-r">
                  نام محصول:
                </label>
                <div className="col-sm-10">
                  <div
                    className={
                      this.state.productError
                        ? this.dangerClassName
                        : this.normalClassName
                    }
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="newProduct"
                      onChange={this.changeHandler.bind(this)}
                    />
                    {this.state.productError ? (
                      <small className="d-block text-danger">
                        نام محصول اجباری است.
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-sm-2 col-form-label t-r">
                  {" "}
                  ویژگی محصول:
                </label>
                <div className="col-sm-10 mt-5">
                  <div className="row mb-5">
                    {this.feature.map((item, index) => (
                      <div className={this.featureClass + " mt-4"} key={index}>
                        <label
                          className={
                            this.state.titleError
                              ? this.dangerClassName + " title-feature"
                              : this.normalClassName + " title-feature"
                          }
                        >
                          {` عنوان ${index + 1}:`}
                        </label>
                        <input
                          type="text"
                          className={"form-control input-feature"}
                          placeholder=""
                          name={"title" + (index + 1)}
                          onChange={(e) => {
                            let change = e.target.value;
                            item.title = change;
                            this.setState({ disableButton: false });
                          }}
                        />
                        <label className="des-feature1">شرح: </label>
                        <textarea
                          rows="4"
                          type="text"
                          className="form-control input-feature"
                          placeholder=""
                          name={"des" + (index + 1)}
                          onChange={(e) => {
                            let change = e.target.value;
                            item.description = change;
                            this.setState({ disableButton: false });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <span
                    className="btn btn-primary"
                    onClick={() => this.countPlus()}
                  >
                    ویژگی جدید
                  </span>
                  <span
                    className="btn btn-danger"
                    onClick={() => this.deleteCount()}
                  >
                    حذف{" "}
                  </span>
                  {this.state.titleError && this.state.featureDesErr ? (
                    <small className="d-block text-danger ">
                      فیلدها را نمی توان خالی گذاشت.
                    </small>
                  ) : this.state.titleError ? (
                    <small className="d-block text-danger ">
                      عنوان ویژگی اجباریست.
                    </small>
                  ) : this.state.featureDesErr ? (
                    <small className="d-block text-danger ">
                      شرح ویژگی اجباریست.
                    </small>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row">
                <label className="col-sm-2 col-form-label t-r">قیمت:</label>
                <div className="col-sm-10">
                  <div
                    className={
                      this.state.priceError
                        ? this.dangerClassName
                        : this.normalClassName
                    }
                  >
                    <input
                      type="number"
                      className="form-control"
                      placeholder=""
                      name="price"
                      onChange={this.changeHandler.bind(this)}
                    />
                    {this.state.priceError ? (
                      <small className="d-block text-danger">
                        قیمت محصول اجباری است.
                      </small>
                    ) : (
                      <small className="d-block text-info">
                        قیمت محصول را به تومان و عدد وارد کنید.
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <label className="col-sm-2 col-form-label t-r">توضیحات:</label>
                <div className="col-sm-10">
                  <div
                    className={
                      this.state.descriptionError
                        ? this.dangerClassName
                        : this.normalClassName
                    }
                  >
                    <textarea
                      type="text"
                      rows="10"
                      className="form-control"
                      placeholder=""
                      name="description"
                      onChange={this.changeHandler.bind(this)}
                    />
                    {this.state.descriptionError ? (
                      <small className="d-block text-danger">
                        توضیحات محصول اجباری است.
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <button
                  type="submit"
                  className="btn btn-success mx-auto"
                  disabled={this.state.disableButton || this.state.loading}
                >
                  {this.state.loading ? (
                    <Loading size={15} />
                  ) : (
                    <span className="btn-label">
                      <i className="material-icons">check</i>
                      ثبت محصول
                    </span>
                  )}
                  <div className="ripple-container"></div>
                </button>
                <Link to="/product" className="btn btn-mute mx-auto">
                  بازگشت
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
