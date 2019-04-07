import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { ApolloClient } from 'apollo-boost';
import App, { Container } from 'next/app';
import Head from 'next/head';
import React, { ErrorInfo } from 'react';
import { ApolloProvider } from 'react-apollo';
import getPageContext, { PageContext } from '../src/getPageContext';
import withApollo from '../src/lib/withApollo';
import { WebAuthentication } from '../src/utils/auth/WebAuthentication';

interface AppProps {
  apollo: ApolloClient<any>;
}

class MyApp extends App<AppProps> {

  private pageContext: PageContext;
  private auth: WebAuthentication | undefined;
  constructor(props: AppProps) {
    // @ts-ignore
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    this.auth = new WebAuthentication()
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // tslint:disable-next-line:no-console
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    // @ts-ignore
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <Head>
          <title>Biergit</title>
        </Head>
        {/* Wrap every page in Styles and Theme providers */}
        <StylesProvider
          generateClassName={this.pageContext.generateClassName}
          sheetsRegistry={this.pageContext.sheetsRegistry}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* ThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <ThemeProvider theme={this.pageContext.theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <ApolloProvider client={apollo}>
              <Component pageContext={this.pageContext} {...pageProps} auth={this.auth}/>
            </ApolloProvider>
          </ThemeProvider>
        </StylesProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
