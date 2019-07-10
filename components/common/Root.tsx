import React from 'react';
import { Auth0Provider } from "../../react-auth0-spa";

interface RootProps {
    Component: any;
    pageProps: any;
}

export default class Root extends React.Component<RootProps> {

    constructor(props: RootProps) {
        super(props);
    }

    onRedirectCallback(appState: any) {
        window.history.replaceState(
            {},
            document.title,
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname,
        );
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Auth0Provider
                domain={process.env.AUTH0_DOMAIN}
                client_id={process.env.AUTH0_CLIENT_ID}
                audience={process.env.AUTH0_AUDIENCE}
                redirect_uri={window.location.origin}
                onRedirectCallback={this.onRedirectCallback}
            >
                <Component {...pageProps} />
            </Auth0Provider>
        );
    }
}
