import Spinner from "react-spinner-material";
import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div className="mx-auto">
        <Spinner radius={40} color={"#9c27b0"} stroke={2} visible={true} />
      </div>
    );
  }
}
