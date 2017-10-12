// @flow

import React from "react";
export default class Error extends React.Component {
  static getInitialProps({ req, res, xhr, pathname }) {
    const statusCode = res ? res.statusCode : xhr ? xhr.status : null;
    return { statusCode, pathname };
  }

  componentDidMount() {
    // We redirect to nteract.github.io to handle our /docs pages and others that
    // are still served on GitHub pages

    // In the future we can make a better custom error page here
    if (this.props.statusCode === 404) {
      window.location.replace(
        `https://nteract.github.io${this.props.pathname}`
      );
    }
  }

  render() {
    if (this.props.statusCode === 404) {
      return (
        <p>
          {`${this.props
            .pathname} not on nteract.io, redirecting to nteract.github.io`}
        </p>
      );
    } else if (this.props.statusCode) {
      return <p>{`An error ${this.props.statusCode} occurred on server`}</p>;
    } else {
      return <p>Unknown error :(</p>;
    }
  }
}
