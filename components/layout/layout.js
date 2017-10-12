import React from "react";
import Head from "../head/head";
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from "./layout.scss";

export default class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <style dangerouslySetInnerHTML={{ __html: styles }} />

        <Head pageTitle={this.props.pageTitle} />
        <Header themeColor={this.props.themeColor} />
        <div className="page">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
