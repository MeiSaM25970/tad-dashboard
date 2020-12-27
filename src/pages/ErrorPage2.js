import React from "react";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="">
      <div
        className=""
        style={{
          background: "url('/img/bg6.jpg') no-repeat center",
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <div className="d-flex flex-row-fluid flex-column justify-content-end align-items-center text-center text-white pb-40 ir-r text-center d-block">
          <h1
            className=" font-weight-bold ir-r text-center mx-auto "
            style={{
              marginTop: 100,
              fontSize: "35px",
              textShadow: "1px 1px 2px white",
            }}
          >
            خطای اتصال با سرور{" "}
          </h1>
          <span
            className=" font-weight-boldest mb-4 mx-auto mt-5"
            style={{ fontSize: "25px", textShadow: "1px 1px 2px black" }}
          >
            لطفا دوباره امتحان کنید.
          </span>
          <Link
            to="/"
            className="mx-auto mt-3"
            style={{
              marginBottom: 200,
              fontSize: "20px",
              textShadow: "1px 1px 2px black",
            }}
          >
            {" "}
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}
