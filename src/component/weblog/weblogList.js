import React, { Component } from "react";
import Loading from "../loading";
import { SingleBlog } from "./singleBlog";

export class WeblogList extends Component {
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
      this.state.data.map((item, index) => (
        <SingleBlog item={item} key={index} {...this.props} />
      ))
    );
  }
}
