import React, { Component } from "react";
import { API_ADDRESS_SERVICE, PUBLIC_FACE } from "../../env";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import * as userService from "../../service";
import { itemsStore } from "./redux/store";
import { fetchItem } from "./redux/actions";

export class SingleBlog extends Component {
  state = { loading: false };
  componentDidMount() {
    this.setState({ item: this.props.item });
  }
  componentWillReceiveProps(newProps) {
    if (newProps.item._id !== this.props.item._id) {
      this.setState({ item: newProps.item });
    }
  }
  handleClickDelete = async () => {
    await userService
      .deleteWeblog(this.state.item._id)
      .then(() => {
        this.setState({ loading: false });
        itemsStore.dispatch(fetchItem(this.state.item));
      })
      .catch();
  };
  submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui text-right ">
            <i className="material-icons-outlined">info</i>

            <h1 className="ir-r">مطمئنید؟</h1>

            <p className="ir-r">آیا شما میخواهید این مقاله را پاک کنید؟</p>
            <button className="btn btn-danger" onClick={onClose}>
              خیر
            </button>
            <button
              className="btn btn-success"
              onClick={async () => {
                await this.setState({ loading: true });

                await this.handleClickDelete();
                await onClose();
              }}
            >
              {this.state.loading ? "..." : "بله ، پاک کن!"}
            </button>
          </div>
        );
      },
    });
  };
  render() {
    return this.state.item ? (
      <div className="col-md-4">
        <div className="card card-product">
          <div
            className="card-header card-header-image"
            data-header-animation="true"
          >
            <a href="#pablo">
              <img
                className="img"
                src={API_ADDRESS_SERVICE + this.state.item.imgPath}
                alt="..."
              />
            </a>
          </div>
          <div className="card-body">
            <div className="card-actions text-center">
              <button
                type="button"
                className="btn btn-danger btn-link fix-broken-card"
              >
                <i className="material-icons">build</i> Fix Header!
              </button>
              <a
                href={PUBLIC_FACE + "singleBlog/" + this.state.item._id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  type="button"
                  className="btn btn-default btn-link"
                  rel="tooltip"
                  data-placement="bottom"
                  title=""
                  data-original-title="View"
                >
                  <i className="material-icons">art_track</i>
                </button>
              </a>
              <Link to={"/weblogs/" + this.state.item._id}>
                <button
                  type="button"
                  className="btn btn-success btn-link"
                  rel="tooltip"
                  data-placement="bottom"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="material-icons">edit</i>
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-link"
                rel="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Remove"
                onClick={this.submit}
              >
                <i className="material-icons">close</i>
              </button>
            </div>
            <h4 className="card-title">
              <a href="#pablo">{this.state.item.title}</a>
            </h4>
            <div className="card-description">{this.state.item.littleDes}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className="container text-right">
        <h3 className="text-warning">مقاله ای وجود ندارد.</h3>
      </div>
    );
  }
}
