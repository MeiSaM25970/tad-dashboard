import React, { Component } from "react";
import { Link } from "react-router-dom";
import { switchSidebarStore, switchToMiniSidebar } from "./redux";
import * as userService from "../../service";

export class MainNavbar extends Component {
  state = {
    miniSidebar: false,
    newOrder: 0,
    newContact: 0,
    newComments: 0,
    orders: [],
    contacts: [],
    comments: [],
    activeSidebar: {
      dashboard: false,
      myprofile: false,
      product: false,
      productId: false,
      productRegister: false,
      newUser: false,
      changePassword: false,
      categories: false,
      order: false,
      orderId: false,
      message: false,
      about: false,
      newBlog: false,
      comments: false,
      commentDetail: false,
      contactDetail: false,
      weblogs: false,
      editWeblog: false,
      users: false,
    },
  };
  async switchToSidebar() {
    await this.setState({ miniSidebar: !this.state.miniSidebar });
    await switchSidebarStore.dispatch(
      switchToMiniSidebar({ miniSidebar: this.state.miniSidebar })
    );
  }
  async logout() {
    this.userInfo = localStorage.clear() || sessionStorage.clear();
    window.location.replace("/login");
  }
  fetchOrder() {
    userService
      .fetchOrder()
      .then(async (res) => {
        await this.setState({ orders: res.data });
        for (var i = 0; i < this.state.orders.length; i++) {
          if (this.state.orders[i].status === "new") {
            this.setState({ newOrder: this.state.newOrder + 1 });
          }
        }
      })
      .catch((err) => console.log(err));
  }
  fetchContact() {
    userService.fetchContact().then(async (res) => {
      await this.setState({ contacts: res.data });
      for (var i = 0; i < this.state.contacts.length; i++) {
        if (this.state.contacts[i].status === true) {
          this.setState({ newContact: this.state.newContact + 1 });
        }
      }
    });
  }
  fetchComments() {
    userService
      .fetchComments()
      .then(async (res) => {
        await this.setState({ comments: res.data });
        for (var i = 0; i < this.state.comments.length; i++) {
          if (this.state.comments[i].status === "new") {
            this.setState({ newComments: this.state.newComments + 1 });
          }
        }
      })
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    this.fetchContact();
    this.fetchOrder();
    this.fetchComments();
    this.activeSidebar();
  }
  componentWillReceiveProps(newProps) {
    if (this.props.match.path !== newProps.match.path) {
      this.render();
    }
  }
  activeSidebar() {
    switch (this.props.match.path) {
      case "/dashboard":
        return this.setState({ activeSidebar: { dashboard: true } });
      case "/myprofile":
        return this.setState({ activeSidebar: { myprofile: true } });
      case "/product":
        return this.setState({ activeSidebar: { product: true } });
      case "/product/:id":
        return this.setState({ activeSidebar: { productId: true } });
      case "/productregister":
        return this.setState({ activeSidebar: { productRegister: true } });
      case "/newUser":
        return this.setState({ activeSidebar: { newUser: true } });
      case "/changePassword":
        return this.setState({ activeSidebar: { changePassword: true } });
      case "/categories":
        return this.setState({ activeSidebar: { categories: true } });
      case "/order":
        return this.setState({ activeSidebar: { order: true } });
      case "/order/:id":
        return this.setState({ activeSidebar: { orderId: true } });
      case "/about":
        return this.setState({ activeSidebar: { about: true } });
      case "/contact":
        return this.setState({ activeSidebar: { message: true } });
      case "/contact/:id":
        return this.setState({ activeSidebar: { contactDetail: true } });
      case "/newblog":
        return this.setState({ activeSidebar: { newBlog: true } });
      case "/comments":
        return this.setState({ activeSidebar: { comments: true } });
      case "/comment/:id":
        return this.setState({ activeSidebar: { commentDetail: true } });
      case "/weblogs/:id":
        return this.setState({ activeSidebar: { editWeblog: true } });
      case "/weblogs":
        return this.setState({ activeSidebar: { weblogs: true } });
      case "/users":
        return this.setState({ activeSidebar: { users: true } });
      default:
        return this.state.activeSidebar;
    }
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div className="container-fluid d-flex justify-content-start align-items-center ">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>

          <div className="navbar-wrapper">
            <div className="navbar-minimize">
              <button
                id="minimizeSidebar"
                className="btn btn-just-icon btn-white btn-fab btn-round"
                onClick={() => this.switchToSidebar()}
              >
                <i className="material-icons text_align-center visible-on-sidebar-regular">
                  more_vert
                </i>
                <i className="material-icons design_bullet-list-67 visible-on-sidebar-mini">
                  view_list
                </i>
                <div className="ripple-container"></div>
              </button>
            </div>
            <Link className="navbar-brand pr-3" to="#">
              {this.state.activeSidebar.dashboard
                ? "داشبورد"
                : this.state.activeSidebar.about
                ? "درباره ما"
                : this.state.activeSidebar.categories
                ? "موضوعات"
                : this.state.activeSidebar.changePassword
                ? "تغییر رمز عبور"
                : this.state.activeSidebar.commentDetail
                ? "جزئیات نظر"
                : this.state.activeSidebar.comments
                ? "نظرات"
                : this.state.activeSidebar.message
                ? "پیام ها"
                : this.state.activeSidebar.myprofile
                ? "پروفایل من"
                : this.state.activeSidebar.newBlog
                ? "مقاله جدید"
                : this.state.activeSidebar.newUser
                ? "ثبت کاربر جدید"
                : this.state.activeSidebar.order
                ? "سفارشات"
                : this.state.activeSidebar.orderId
                ? "جزئیات سفارش"
                : this.state.activeSidebar.product
                ? "محصولات"
                : this.state.activeSidebar.productId
                ? "ویرایش محصول"
                : this.state.activeSidebar.productRegister
                ? "ثبت محصول جدید"
                : this.state.activeSidebar.weblogs
                ? "مقالات"
                : this.state.activeSidebar.editWeblog
                ? "ویرایش مقاله"
                : this.state.activeSidebar.users
                ? "مدیریت کاربران"
                : ""}
            </Link>
          </div>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="material-icons">dashboard</i>
                  <p className="d-lg-none d-md-block">Stats</p>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link"
                  to="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="material-icons">notifications</i>
                  {(this.state.newOrder > 0 ||
                    this.state.newContact > 0 ||
                    this.state.newComments > 0) && (
                    <span className="notification">
                      {this.state.newOrder +
                        this.state.newContact +
                        this.state.newComments}
                    </span>
                  )}
                  <p className="d-lg-none d-md-block">Some Actions</p>
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-left"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {this.state.newOrder > 0 && (
                    <Link className="dropdown-item" to="/order">
                      سفارشات
                      <small className="text-danger notification-count">
                        {this.state.newOrder}
                      </small>
                    </Link>
                  )}
                  {this.state.newContact > 0 && (
                    <Link className="dropdown-item" to="/contact">
                      پیام ها{" "}
                      <small className="text-danger notification-count">
                        {this.state.newContact}
                      </small>
                    </Link>
                  )}
                  {this.state.newComments > 0 && (
                    <Link className="dropdown-item" to="/comments">
                      نظرات{" "}
                      <small className="text-danger notification-count">
                        {this.state.newComments}
                      </small>
                    </Link>
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link"
                  to="#"
                  id="navbarDropdownProfile"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="material-icons">person</i>
                  <p className="d-lg-none d-md-block">Account</p>
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-left"
                  aria-labelledby="navbarDropdownProfile"
                >
                  <Link className="dropdown-item" to="/myprofile">
                    پروفایل من
                  </Link>
                  <Link className="dropdown-item" to="/newUser">
                    افزودن کاربر جدید
                  </Link>
                  <Link className="dropdown-item" to="/changePassword">
                    تغییر رمز عبور
                  </Link>

                  <div className="dropdown-divider"></div>
                  <Link
                    className="dropdown-item"
                    onClick={() => this.logout()}
                    to="#"
                  >
                    خروج از حساب کاربری{" "}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
