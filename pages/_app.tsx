import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import App from "next/app";
import Head from "next/head";
import React from "react";
import theme from "../src/theme";

interface GetInitialProps {
  Component: any;
  ctx: any;
}

export default class BiergitApp extends App {

  static async getInitialProps({ Component, ctx }: GetInitialProps) {
    let pageProps: any = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session && ctx.req.session.user) {
      pageProps.user = ctx.req.session.passport.user;
    }
    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <title>Biergit</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </div>
    );
  }
}
