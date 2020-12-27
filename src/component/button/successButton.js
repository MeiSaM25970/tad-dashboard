import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export function SuccessButton(props) {
  const submit = () => {
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
  };

  return (
    <button onClick={submit} type={props.type} className={props.class}>
      {props.titleIcon ? props.titleIcon : ""}
      {props.icon ? props.icon : props.title}
    </button>
  );
}
