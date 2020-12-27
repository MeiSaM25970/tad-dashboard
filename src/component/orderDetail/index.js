import React, { Component } from "react";
import moment from "moment-jalaali";
import Loading from "../loading";
import validator from "validator";
import * as userService from "../../service";
import { Link } from "react-router-dom";
import { AlertButton } from "../button/button";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
export class OrderDetail extends Component {
  state = {
    postTracking: false,
    editFullName: false,
    editMobile: false,
    editAddress: false,
    cancelOrder: false,
    fullNameErr: false,
    mobileErr: false,
    addressErr: false,
    postCodeErr: false,
    areaErr: false,
    cityErr: false,
    mobileTypeErr: false,
    editPostCode: false,
    isValid: false,
    zipCodeTypeErr: false,
    deleteAlert: false,
    loading: false,
    order: {
      _id: "",
      fullName: "",
      mobile: "",
      city: "",
      area: "",
      address: "",
      status: "new",
      postCode: "",
    },
  };

  componentWillReceiveProps(newProps) {
    if (this.props.order !== newProps.order) {
      this.setState({ order: newProps.order });
    }
  }
  async submitHandler(e) {
    await e.preventDefault();
    await this.setState({ loading: true });
    await this.validationInput();
    if (this.state.isValid) {
      const id = this.state.order._id;
      const orderEdited = this.state.order;
      userService
        .orderEdit(id, orderEdited)
        .then(() => {
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
        })
        .catch((error) => {
          this.configError();
          console.log(error);
        })
        .finally(() => this.setState({ loading: false }));
    }
  }
  async validationInput() {
    const fullNameEmpty = await validator.isEmpty(this.state.order.fullName);
    const mobileEmpty = await validator.isEmpty(this.state.order.mobile);
    const addressEmpty = await validator.isEmpty(this.state.order.address);
    const postCodeEmpty = await validator.isEmpty(this.state.order.postCode);
    const areaEmpty = await validator.isEmpty(this.state.order.area);
    const cityEmpty = await validator.isEmpty(this.state.order.city);
    const mobileType = await validator.isMobilePhone(
      this.state.order.mobile,
      "fa-IR"
    );
    if (fullNameEmpty) {
      this.setState({ fullNameErr: true });
    } else this.setState({ fullNameErr: false });
    if (mobileEmpty) {
      this.setState({ mobileErr: true });
    } else this.setState({ mobileErr: false });
    if (mobileType) {
      this.setState({ mobileTypeErr: false, mobileErr: false });
    } else this.setState({ mobileTypeErr: true });
    if (addressEmpty) {
      this.setState({ addressErr: true });
    } else this.setState({ addressErr: false });
    if (postCodeEmpty) {
      this.setState({ postCodeErr: true });
    } else this.setState({ postCodeErr: false });
    if (areaEmpty) {
      this.setState({ areaErr: true });
    } else this.setState({ areaErr: false });
    if (cityEmpty) {
      this.setState({ cityErr: true });
    } else this.setState({ cityErr: false });
    if (this.state.order.postCode.length !== 10) {
      this.setState({ zipCodeTypeErr: true });
    } else this.setState({ zipCodeTypeErr: false });
    if (
      !fullNameEmpty &&
      !mobileEmpty &&
      mobileType &&
      !addressEmpty &&
      !postCodeEmpty &&
      !areaEmpty &&
      !cityEmpty &&
      !this.state.zipCodeTypeErr
    ) {
      this.setState({ isValid: true });
    } else this.setState({ isValid: false, loading: false });
  }
  changeHandler(e) {
    const order = {};
    const name = e.target.name;
    const value = e.target.value;
    order[name] = value;
    this.setState({
      order: { ...this.state.order, ...order },
      postTracking: false,
      cancelOrder: false,
    });
  }
  radioPostTrackingChangeHandler(e) {
    const radio = {};
    const name = e.target.name;
    const value = e.target.value;
    radio[name] = value;
    this.setState({
      ...this.state,
      order: { ...this.state.order, ...radio },
      postTracking: true,
    });
  }
  radioCancelOrderChangeHandler(e) {
    const radio = {};
    const name = e.target.name;
    const value = e.target.value;
    radio[name] = value;
    this.setState({
      ...this.state,
      order: { ...this.state.order, ...radio },
      cancelOrder: true,
    });
  }

  display = "none";
  configError() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui text-right text-danger">
            <i className="material-icons-outlined text-danger">error</i>

            <p className="ir-r">خطا! لطفاً دوباره امتحان کنید.</p>

            <button
              className="btn btn-danger ir-r"
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
    const date = moment(this.props.order.date, "YYYY/MM/DD HH:mm:ss").format(
      "jYYYY/jM/jD ساعت: HH:mm:ss"
    );
    return this.props.order ? (
      <div className="content text-right ">
        <div className="col-md-12">
          <div className="card ">
            <div className="card-header card-header-rose card-header-text">
              <div className="card-text">
                <h4 className="card-title ir-r">جزئیات سفارش </h4>
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
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    نام و نام خانوادگی:
                  </label>
                  <div className="col-sm-6">
                    <div className="form-group bmd-form-group">
                      {!this.state.editFullName ? (
                        <span className="form-control">
                          {this.state.order.fullName}
                        </span>
                      ) : (
                        <input
                          type="text"
                          name="fullName"
                          className="form-control"
                          onChange={this.changeHandler.bind(this)}
                        />
                      )}
                      {/* <span className="bmd-help">
                        A block of help text that breaks onto a new line.
                      </span> */}
                    </div>
                  </div>
                  <div className="col-sm-4 td-actions ">
                    <button
                      type="button"
                      rel="tooltip"
                      className={
                        !this.state.editFullName
                          ? "btn btn-info btn-link order-detail-button"
                          : "d-none"
                      }
                      data-original-title=""
                      title="ویرایش"
                      onClick={() => this.setState({ editFullName: true })}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      type="button"
                      rel="tooltip"
                      className={
                        this.state.editFullName
                          ? "btn btn-success btn-link order-detail-button mr-4"
                          : "d-none"
                      }
                      data-original-title=""
                      title=" ذخیره موقت"
                      onClick={async () => {
                        await this.validationInput();
                        if (this.state.isValid) {
                          this.setState({ editFullName: false });
                        }
                      }}
                    >
                      <i className="material-icons">done</i>
                    </button>
                  </div>
                </div>
                {this.state.fullNameErr && (
                  <div className="row">
                    <div className="col-2"></div>
                    <small className="d-block text-danger col-10">
                      نام و نام خانوادگی اجباری است.
                    </small>
                  </div>
                )}

                <div className="row">
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    شماره تماس:
                  </label>
                  <div className="col-sm-6">
                    <div className="form-group bmd-form-group">
                      {!this.state.editMobile ? (
                        <span className="form-control">
                          {this.state.order.mobile}
                        </span>
                      ) : (
                        <input
                          type="tel"
                          className="form-control"
                          name="mobile"
                          onChange={this.changeHandler.bind(this)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4 td-actions ">
                    <button
                      type="button"
                      rel="tooltip"
                      className={
                        !this.state.editMobile
                          ? "btn btn-info btn-link order-detail-button"
                          : "d-none"
                      }
                      data-original-title=""
                      title="ویرایش"
                      onClick={() => this.setState({ editMobile: true })}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      type="button"
                      rel="tooltip"
                      className={
                        this.state.editMobile
                          ? "btn btn-success btn-link order-detail-button mr-4"
                          : "d-none"
                      }
                      data-original-title=""
                      title="ذخیره موقت"
                      onClick={async () => {
                        await this.validationInput();
                        if (this.state.isValid) {
                          this.setState({ editMobile: false });
                        }
                      }}
                    >
                      <i className="material-icons">done</i>
                    </button>
                  </div>
                </div>
                {this.state.mobileErr ? (
                  <div className="row">
                    <div className="col-2"></div>
                    <small className="d-block text-danger col-10">
                      تلفن اجباری است.
                    </small>
                  </div>
                ) : (
                  this.state.mobileTypeErr && (
                    <div className="row">
                      <div className="col-2"></div>
                      <small className="d-block text-danger col-10">
                        شماره تلفن صحیح نمی باشد .
                      </small>
                    </div>
                  )
                )}
                <div className="row">
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    محصول خریداری شده:
                  </label>
                  <div className="col-sm-6">
                    <div className="form-group bmd-form-group">
                      <span className="form-control">
                        {this.state.order.productName}
                      </span>

                      {/* <span className="bmd-help">
                        A block of help text that breaks onto a new line.
                      </span> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    قیمت:
                  </label>
                  <div className="col-sm-6">
                    <div className="form-group bmd-form-group">
                      <span className="form-control">
                        {this.state.order.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    تاریخ ثبت:
                  </label>
                  <div className="col-sm-6">
                    <div className="form-group bmd-form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="date"
                        defaultValue={this.props.order.date ? date : ""}
                        disabled={true}
                        onChange={this.changeHandler.bind(this)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    کد رهگیری:
                  </label>
                  <div className="col-sm-6">
                    <div className="form-group bmd-form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="trackingCode"
                        defaultValue={this.props.order.trackingCode}
                        disabled={true}
                        onChange={this.changeHandler.bind(this)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    آدرس:
                  </label>
                  <div className="col-sm-2">
                    <div className="form-group bmd-form-group">
                      {!this.state.editAddress ? (
                        <span className="form-control">
                          {this.state.order.area}
                        </span>
                      ) : (
                        <input
                          type="text"
                          className="form-control "
                          name="area"
                          placeholder="استان"
                          onChange={this.changeHandler.bind(this)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group bmd-form-group">
                      {!this.state.editAddress ? (
                        <span className="form-control">
                          {this.state.order.city}
                        </span>
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          placeholder="شهر"
                          onChange={this.changeHandler.bind(this)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group bmd-form-group">
                      {!this.state.editAddress ? (
                        <textarea
                          className="form-control h-5"
                          value={this.state.order.address}
                          disabled={true}
                        ></textarea>
                      ) : (
                        <textarea
                          type="text"
                          className="form-control"
                          defaultValue=""
                          name="address"
                          placeholder="آدرس"
                          onChange={this.changeHandler.bind(this)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-sm-2 td-actions ">
                    <button
                      type="button"
                      rel="tooltip"
                      className={
                        !this.state.editAddress
                          ? "btn btn-info btn-link order-detail-button "
                          : "d-none"
                      }
                      title="ویرایش"
                      onClick={() => this.setState({ editAddress: true })}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      type="button"
                      rel="tooltip"
                      className={
                        this.state.editAddress
                          ? "btn btn-success btn-link order-detail-button mr-4"
                          : "d-none"
                      }
                      title="ذخیره موقت"
                      onClick={async () => {
                        await this.validationInput();
                        if (this.state.isValid) {
                          this.setState({ editAddress: false });
                        }
                      }}
                    >
                      <i className="material-icons">done</i>
                    </button>
                  </div>
                </div>
                {(this.state.cityErr ||
                  this.state.areaErr ||
                  this.state.addressErr) && (
                  <div className="row">
                    <div className="col-2"></div>
                    <small className="d-block text-danger col-10">
                      آدرس اجباری است.
                    </small>
                  </div>
                )}
                <div className="row">
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    کدپستی:
                  </label>
                  <div className="col-sm-2 text-center">
                    <div className="form-group bmd-form-group">
                      {!this.state.editPostCode ? (
                        <span className="form-control">
                          {this.state.order.postCode}
                        </span>
                      ) : (
                        <input
                          type="number"
                          minLength={10}
                          maxLength={10}
                          className="form-control"
                          name="postCode"
                          onChange={this.changeHandler.bind(this)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4 td-actions ">
                    <button
                      type="button"
                      rel="tooltip"
                      className={
                        !this.state.editPostCode
                          ? "btn btn-info btn-link order-detail-button"
                          : "d-none"
                      }
                      data-original-title=""
                      title="ویرایش"
                      onClick={() => this.setState({ editPostCode: true })}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      type="button"
                      rel="tooltip"
                      className={
                        this.state.editPostCode
                          ? "btn btn-success btn-link order-detail-button mr-4"
                          : "d-none"
                      }
                      data-original-title=""
                      title=" ذخیره موقت"
                      onClick={async () => {
                        await this.validationInput();
                        if (this.state.isValid) {
                          this.setState({ editPostCode: false });
                        }
                      }}
                    >
                      <i className="material-icons">done</i>
                    </button>
                  </div>
                </div>
                {this.state.postCodeErr ? (
                  <div className="row">
                    <div className="col-2"></div>
                    <small className="d-block text-danger col-10">
                      کدپستی اجباری است.
                    </small>
                  </div>
                ) : (
                  this.state.zipCodeTypeErr && (
                    <div className="row">
                      <div className="col-2"></div>
                      <small className="d-block text-danger col-10">
                        کدپستی صحیح نمی باشد .
                      </small>
                    </div>
                  )
                )}
                <div className="row">
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    وضعیت سفارش:
                  </label>
                  <div className="col-sm-10 checkbox-radios text-right order-status">
                    <div className="form-check ">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="new"
                          value="new"
                          disabled={true}
                          checked={this.state.order.status === "new" && true}
                        />
                        {"سفارش جدید"}
                        <span className="circle">
                          <span className="check"></span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="orderConfirmation"
                          checked={
                            this.state.order.status === "orderConfirmation" &&
                            true
                          }
                          onChange={this.changeHandler.bind(this)}
                        />{" "}
                        {"تایید سفارش"}
                        <span className="circle">
                          <span className="check"></span>
                        </span>
                      </label>
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="orderCancel"
                          checked={
                            this.state.order.status === "orderCancel" && true
                          }
                          onChange={this.radioCancelOrderChangeHandler.bind(
                            this
                          )}
                        />{" "}
                        {"لغو سفارش"}
                        <span className="circle">
                          <span className="check"></span>
                        </span>
                      </label>
                      <label className="">دلیل لغو سفارش:</label>
                      <input
                        type="text"
                        className="form-control col-3 post-tracking"
                        name="cancelOrderDes"
                        defaultValue={this.props.order.cancelOrderDes || ""}
                        disabled={!this.state.cancelOrder}
                        onChange={this.radioCancelOrderChangeHandler.bind(this)}
                      />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="productPreparation"
                          checked={
                            this.state.order.status === "productPreparation" &&
                            true
                          }
                          onChange={this.changeHandler.bind(this)}
                        />{" "}
                        آماده سازی محصول
                        <span className="circle">
                          <span className="check"></span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check ">
                      <label className="form-check-label col-sm-4 mt-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="deliveryToThePost"
                          checked={
                            this.state.order.status === "deliveryToThePost" &&
                            true
                          }
                          onChange={this.radioPostTrackingChangeHandler.bind(
                            this
                          )}
                        />{" "}
                        تحویل به پست
                        <span className="circle">
                          <span className="check"></span>
                        </span>
                      </label>
                      <label className=" post-tracking">
                        کد رهگیری اداره پست:
                      </label>
                      <input
                        type="text"
                        className="form-control col-3 post-tracking"
                        name="trackingPost"
                        defaultValue={this.props.order.trackingPost || ""}
                        disabled={!this.state.postTracking}
                        onChange={this.radioPostTrackingChangeHandler.bind(
                          this
                        )}
                      />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          checked={
                            this.state.order.status === "deliveryToCustomer" &&
                            true
                          }
                          value="deliveryToCustomer"
                          onChange={this.changeHandler.bind(this)}
                        />{" "}
                        تحویل به مشتری
                        <span className="circle">
                          <span className="check"></span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label ir-r order-detail-text-right">
                    توضیحات:
                  </label>
                  <div className="col-sm-6">
                    <div className="form-group bmd-form-group">
                      <textarea
                        type="text"
                        className="form-control"
                        rows="3"
                        name="orderDes"
                        defaultValue={
                          this.props.order.orderDes
                            ? this.props.order.orderDes
                            : ""
                        }
                        onChange={this.changeHandler.bind(this)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-5 mb-4">
                  {" "}
                  <div className="col-sm-6 mx-auto">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? (
                        <Loading size={15} />
                      ) : (
                        "ذخیره نهایی"
                      )}
                    </button>
                    <Link className="btn btn-primary mr-3" to="/order">
                      بازگشت
                    </Link>
                  </div>
                  <AlertButton
                    class="btn btn-danger ml-5 d-block"
                    type="button"
                    orderId={this.state.order._id}
                    {...this.props}
                  />
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
