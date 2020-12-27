import React from "react";
import { Link } from "react-router-dom";

export const SuccessDone = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      {" "}
      <div className="container text-center">
        <h2 className="text-success">محصول شما با موفقیت ثبت شد.</h2>
        <Link className="btn btn-success" to="/productregister">
          بازگشت
        </Link>
        <Link className="btn btn-info" to="/">
          صفحه اصلی
        </Link>
      </div>
    </div>
  );
};
