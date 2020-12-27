import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import * as userService from "../../service";

export function AlertButton(props) {
  const handleClickDelete = () => {
    userService
      .deleteOrder(props.orderId)
      .then(() => {
        props.history.push("/order");
      })
      .catch(() => configError());
  };
  const configError = () => {
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
  };
  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui text-right ">
            <i className="material-icons-outlined">info</i>

            <h1 className="ir-r">مطمئنید؟</h1>

            <p className="ir-r">آیا شما میخواهید این سفارش را پاک کنید؟</p>
            <button className="btn btn-danger" onClick={onClose}>
              خیر
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                handleClickDelete();
                onClose();
              }}
            >
              بله ، پاک کن!
            </button>
          </div>
        );
      },
    });
  };

  return (
    <button
      onClick={submit}
      title={props.des}
      type={props.type}
      className={props.class}
    >
      {props.icon ? props.icon : "حذف سفارش"}
    </button>
  );
}
