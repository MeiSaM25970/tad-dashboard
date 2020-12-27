import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Page from "./component/pageTitle/pageTitle";
import {
  HomePage,
  DashboardPage,
  ProductPage,
  ProductRegisterPage,
  ErrorPage,
  OrderPage,
  OrderDetailPage,
  ProductEditPage,
  CategoriesPage,
  EditProfilePage,
  NewUserPage,
  ChangePasswordPage,
  AboutUsPage,
  ContactDetailPage,
  CommentDetailPage,
  CommentsPage,
  WeblogPage,
  ContactPage,
} from "./pages/";
import { Login } from "./component/Login";
import { SuccessDone } from "./component/product/success";
import * as userService from "./service";
import { loginUserStore } from "./component/Login/redux";
import { switchSidebarStore } from "./component/dashboard/redux/";
import { WeblogListPage } from "./pages/weblogListPage";
import { productStore } from "./component/product/redux/store";
import { EditBlogPage } from "./pages/editBlogePage";
import { UsersPage } from "./pages/usersPage";
import { ManageProfilePage } from "./pages/manageProfile";
import { SideBar } from "./component/dashboard";

class App extends Component {
  state = { data: [], miniSidebar: false };

  userIsLogin() {
    if (this.userInfo) {
      this.setState({ userInfo: JSON.parse(this.userInfo) });
    }
  }
  fetchData() {
    userService
      .fetchProduct(this.state.userInfo)
      .then((res) => this.setState({ data: res.data }));
  }
  componentDidMount() {
    this.userInfo =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    this.userIsLogin();
    this.fetchData();

    this.unsubscribe = loginUserStore.subscribe(() => {
      const arrayNumber = loginUserStore.getState().length;
      this.setState({ userInfo: loginUserStore.getState()[arrayNumber - 1] });
    });
    switchSidebarStore.subscribe(() => {
      const arrayNumber = switchSidebarStore.getState().length;
      this.setState({
        miniSidebar: switchSidebarStore.getState()[arrayNumber - 1],
      });
    });
    this.productUnsubscribe = productStore.subscribe(() => this.fetchData());
  }
  componentWillUnmount() {
    this.unsubscribe();
    this.productUnsubscribe();
  }

  render() {
    if (this.state.userInfo || this.state.userInfo !== undefined) {
      return (
        <div
          className={
            this.state.miniSidebar.miniSidebar ? "App sidebar-mini" : "App"
          }
        >
          <BrowserRouter>
            <SideBar />
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route
                path="/myprofile"
                exact
                render={(props) => (
                  <Page title="ویرایش پروفایل">
                    <EditProfilePage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/login"
                exact
                render={(props) => (
                  <Page title="ورود">
                    <Login {...props} />
                  </Page>
                )}
              />
              <Route
                path="/comments"
                exact
                render={(props) => (
                  <Page title="نظرات">
                    <CommentsPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/comment/:id"
                exact
                render={(props) => (
                  <Page title="نظرات">
                    <CommentDetailPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/product"
                exact
                render={(props) => (
                  <Page title="محصولات">
                    <ProductPage {...props} data={this.state.data} />
                  </Page>
                )}
              />
              <Route
                path="/product/:id"
                exact
                render={(props) => (
                  <Page title="ویرایش محصول">
                    <ProductEditPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/productregister"
                exact
                render={(props) => (
                  <Page title="ثبت محصول">
                    <ProductRegisterPage {...props} />
                  </Page>
                )}
              />

              <Route
                path="/successproduct"
                exact
                render={(props) => (
                  <Page title="ثبت موفق">
                    <SuccessDone {...props} />
                  </Page>
                )}
              />
              <Route
                path="/newUser"
                exact
                render={(props) => (
                  <Page title="کاربر جدید">
                    <NewUserPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/changePassword"
                exact
                render={(props) => (
                  <Page title="تغییر رمز عبور">
                    <ChangePasswordPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/dashboard"
                exact
                render={(props) => (
                  <Page title="داشبورد">
                    <DashboardPage {...props} userInfo={this.state.userInfo} />
                  </Page>
                )}
              />
              <Route
                path="/contact/:id"
                exact
                render={(props) => (
                  <Page title=" جزئیات پیام">
                    <ContactDetailPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/users"
                exact
                render={(props) => (
                  <Page title=" مدیریت کاربران">
                    <UsersPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/contact"
                exact
                render={(props) => (
                  <Page title=" تماس با ما">
                    <ContactPage {...props} data={this.state.data} />
                  </Page>
                )}
              />
              <Route
                path="/categories"
                exact
                render={(props) => (
                  <Page title="موضوعات وبلاگ">
                    <CategoriesPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/error"
                exact
                render={(props) => (
                  <Page title="خطای اتصال به سرور">
                    <ErrorPage {...props} />
                  </Page>
                )}
              />

              <Route
                path="/order"
                exact
                render={(props) => (
                  <Page title="سفارشات">
                    <OrderPage {...props} data={this.state.data} />
                  </Page>
                )}
              />
              <Route
                path="/order/:id"
                exact
                render={(props) => (
                  <Page title=" بررسی سفارش">
                    <OrderDetailPage {...props} data={this.state.data} />
                  </Page>
                )}
              />
              <Route
                path="/about"
                exact
                render={(props) => (
                  <Page title=" درباره ما">
                    <AboutUsPage {...props} data={this.state.data} />
                  </Page>
                )}
              />
              <Route
                path={"/newblog"}
                exact
                render={(props) => (
                  <Page title=" مقاله جدید">
                    <WeblogPage {...props} />
                  </Page>
                )}
              />
              <Route
                path={"/weblogs/:id"}
                exact
                render={(props) => (
                  <Page title=" ویرایش مقاله">
                    <EditBlogPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/weblogs"
                exact
                render={(props) => (
                  <Page title=" لیست مقالات ">
                    <WeblogListPage {...props} />
                  </Page>
                )}
              />
              <Route
                path="/manageProfile/:username"
                exact
                render={(props) => (
                  <Page title=" ویرایش پروفایل ">
                    <ManageProfilePage {...props} />
                  </Page>
                )}
              />
              <Redirect to="/login" />
            </Switch>
          </BrowserRouter>
        </div>
      );
    } else
      return (
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route
                path="/login"
                exact
                render={(props) => (
                  <Page title="ورود">
                    <Login {...props} />
                  </Page>
                )}
              />
              <Route
                path="/error"
                exact
                render={(props) => (
                  <Page title="خطای اتصال به سرور">
                    <ErrorPage {...props} />
                  </Page>
                )}
              />

              {/* <Redirect to="/login" /> */}
            </Switch>
          </BrowserRouter>
        </div>
      );
  }
}

export default App;
