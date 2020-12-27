import React, { Component } from "react";
import validator from "validator";
import { API_ADDRESS_SERVICE } from "../../env";
import * as userService from "../../service";
import Loading from "../loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link } from "react-router-dom";
import { productStore } from "./redux/store";
import { editProduct } from "./redux/actions";
export class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.uploadedImage = React.createRef(null);
    this.imageUploader = React.createRef(null);
  }

  state = {
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
    editFeature: false,
    data: {},
    feature: [{ title: "", description: `` }],
    loading: false,
    disableButton: true,
  };
  dangerClassName = "form-group bmd-form-group has-danger is-focused";
  normalClassName = "form-group bmd-form-group";
  featureClass = "col-sm-12 col-md-6 col-lg-4 ";
  componentDidMount() {
    const id = this.props.match.params.id;
    userService
      .fetchProductById(id)
      .then(async (res) => {
        await this.setState({
          data: res.data,
          imgPath: res.data.img,
          count: res.data.feature.length,
          newProduct: res.data.title,
          price: res.data.price,
          description: res.data.description,
          feature: res.data.feature,
        });
      })
      .catch((error) => console.log(error));
  }
  submitHandler = async (e) => {
    await e.preventDefault();
    await this.setState({ loading: true });
    await this.productValidation();
    await this.featureValidation();
    if (
      !this.state.productError &&
      !this.state.priceError &&
      !this.state.descriptionError &&
      !this.state.featureDesErr &&
      !this.state.titleError
    ) {
      await this.setState({ isValid: true });
      if (this.state.img) {
        await this.uploadFile();
      }
      const product = {
        title: this.state.newProduct,
        price: this.state.price,
        description: this.state.description,
        img: this.state.imgPath,
        feature: this.state.feature,
      };
      const productId = this.props.match.params.id;
      userService
        .EditProduct(productId, product)
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
                        await onClose();
                        await productStore.dispatch(editProduct(product));
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
        .catch(() => this.setState({ isDone: false, loading: false }));
    } else await this.setState({ isValid: false });
    if (!this.state.isValid) {
      this.scrollTop();
    }
  };

  countPlus() {
    this.state.feature.push({ title: "", description: `` });
    this.setState({ count: +this.state.count + 1 });
  }
  deleteCount() {
    if (this.state.count > 1) {
      let lastArrayNum = this.state.feature.length - 1;
      this.state.feature.splice(lastArrayNum);
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
  };
  featureValidation = async () => {
    for (var i = 0; i < this.state.feature.length; i++) {
      const title = await validator.isEmpty(this.state.feature[i].title);
      const description = await validator.isEmpty(
        this.state.feature[i].description
      );
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
    return this.state.data ? (
      <div className="col-md-12 " style={{ marginTop: 100 }}>
        <div className="card ">
          <div className="card-header card-header-rose card-header-text text-right">
            <div className="card-text">
              <h4 className="card-title ir-r">ویرایش محصول</h4>
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
                      src={
                        API_ADDRESS_SERVICE + this.state.data.img ||
                        "/img/uploadImage.png"
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
                      defaultValue={this.state.data.title}
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
                    {this.state.feature.map((item, index) => (
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
                          defaultValue={item.title}
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
                          defaultValue={item.description}
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

              <div className="row mt-2">
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
                      defaultValue={this.state.data.price}
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
                      className="form-control"
                      placeholder=""
                      rows="10"
                      name="description"
                      defaultValue={this.state.data.description}
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
                  disabled={this.state.loading || this.state.disableButton}
                >
                  {this.state.loading ? (
                    <Loading size={15} />
                  ) : (
                    <span className="btn-label">
                      <i className="material-icons">check</i>
                      ویراش محصول
                    </span>
                  )}
                </button>
                <Link to="/product" className="btn btn-mute mx-auto">
                  بازگشت
                </Link>
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
