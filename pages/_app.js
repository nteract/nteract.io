import App, { Container } from 'next/app';
import React from 'react';
import { WindowSize } from 'react-fns';
class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <WindowSize>
          {(size) => (
            <Component
              {...pageProps}
              size={size.width > 0 ? { ...size } : null}
            />
          )}
        </WindowSize>
      </Container>
    );
  }
}

export default MyApp;
