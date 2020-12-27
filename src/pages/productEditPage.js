import React, { Fragment } from "react";
import { MainNavbar } from "../component/dashboard";
import { ProductEdit } from "../component/product";

export const ProductEditPage = (props) => {
  return (
    <Fragment>
      <div className="main-panel ps ps--active-y">
        <MainNavbar {...props} />
        <ProductEdit {...props} />
      </div>
    </Fragment>
  );
};
