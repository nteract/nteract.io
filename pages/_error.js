// @flow

import * as React from "react";
export default class Error extends React.Component<*, *> {
  static getInitialProps({ req, res, xhr, pathname }: *) {
    const statusCode = res ? res.statusCode : xhr ? xhr.status : null;
    return { statusCode, pathname };
  }

  render() {
    if (this.props.statusCode === 404) {
      return (
        <>
          <h1>404 😨</h1>
          <p>
            {`${this.props.pathname} not on nteract.io. Raise an issue on `}
            <a href="https://github.com/nteract/nteract.io/issues">
              the nteract.io github repository
            </a>
            {`. For now though, you can make your way `}
            <a href="/">Home</a>
          </p>
        </>
      );
    } else if (this.props.statusCode) {
      return <p>{`An error ${this.props.statusCode} occurred on server`}</p>;
    } else {
      return <p>Unknown error :(</p>;
    }
  }
}
