import React from "react";
import styles from "./page-header.scss";

export class PageHeaderTitle extends React.Component {
  render() {
    return <h1>{this.props.children}</h1>;
  }
}
export class PageHeaderLeft extends React.Component {
  render() {
    return <div className="page-header-left">{this.props.children}</div>;
  }
}

export class PageHeaderRight extends React.Component {
  render() {
    return <div className="page-header-right">{this.props.children}</div>;
  }
}

export class PageHeader extends React.Component {
  render() {
    return (
      <section
        className="page-header"
        style={{
          backgroundColor: this.props.themeColor
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div className="page-header-wrapper">{this.props.children}</div>
      </section>
    );
  }
}
