import React, { Component } from "react";
import { Product } from "./product";
import Loading from "../loading";

export class ProductList extends Component {
  state = {};
  componentDidMount() {
    this.setState({ data: this.props.data });
  }
  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data });

    if (this.props.data.length !== newProps.data.length) {
      this.setState({ newProps: "received" });
    }
  }
  render() {
    return !this.state.data ? (
      <Loading />
    ) : (
      this.state.data.map((item, index) => <Product item={item} key={index} />)
    );
  }
}
