import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div className="off-canvas-sidebar">
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
          <div className="container" dir="ltr">
            <div className="navbar-wrapper">
              <a className="navbar-brand" href="/login">
                صفحه ورود
              </a>
            </div>
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
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="../dashboard.html" className="nav-link">
                    <i className="material-icons">dashboard</i>
                    داشبورد
                  </a>
                </li>
                <li className="nav-item ">
                  <Link to="/register" className="nav-link">
                    <i className="material-icons">person_add</i>
                    عضویت
                  </Link>
                </li>
                <li className="nav-item  active ">
                  <Link to="/login" className="nav-link">
                    <i className="material-icons">fingerprint</i>
                    ورود
                  </Link>
                </li>
                <li className="nav-item ">
                  <a href="../pages/lock.html" className="nav-link">
                    <i className="material-icons">lock_open</i>
                    خروج از حساب
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
