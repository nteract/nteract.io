// @flow
import App, { Container } from 'next/app';
import React from 'react';
import { App as AppWrapper } from '@components/app';
import { Header } from '@components/header';
import { Footer } from '@components/footer';
import { WindowSize } from 'react-fns';

// Should these types come from next.js directly somehow?
type AppProps<P> = {
  Component: React.Component<*, *> & {
    getInitialProps: ?(ctx: Context<*>) => P,
  },
  router: *,
  ctx: Context<*>,
};

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }: AppProps<*>) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  componentDidMount() {
    require('@common/css-paint-polyfill');
    require('@common/rip');
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppWrapper>
        <Container>
          <WindowSize>
            {(size) => (
              <>
                <Header />
                <Component
                  {...pageProps}
                  size={size.width > 0 ? { ...size } : null}
                />
                <Footer />
              </>
            )}
          </WindowSize>
        </Container>
      </AppWrapper>
    );
  }
}

export default MyApp;
