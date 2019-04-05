
import ApolloClient from 'apollo-client';
import { IncomingHttpHeaders } from 'http';
import { NextContext } from 'next';
import { NextAppContext } from 'next/app';
import { DefaultQuery } from 'next/router';

// tslint:disable-next-line:no-namespace
declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_AUTH_TOKEN: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    API_URI: string;
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CALLBACK_URI: string;
  }
  interface Global {
    fetch: function;
  }
  interface Process {
    browser: boolean;
  }
}

declare global {
  namespace NodeJS {
    interface Process {
      browser?: boolean;
    }
  }
}

declare module "*.svg" {
  const content: any;
  export default content;
}


export interface WithApolloOptions {
  getDataFromTree?: 'always' | 'never' | 'ssr';
}

export interface WithApolloState<TCache> {
  data?: TCache;
}

export interface WithApolloProps<TCache> {
  apolloState: WithApolloState<TCache>;
}

export interface InitApolloOptions<TCache> {
  ctx?: NextContext<DefaultQuery>;
  headers?: IncomingHttpHeaders;
  initialState?: TCache;
}

export type InitApolloClient<TCache> = (
  options: InitApolloOptions<TCache>
) => ApolloClient<TCache>;

export interface AppContext<Q extends DefaultQuery = DefaultQuery>
  extends NextContext<Q> {
  // Custom prop added by withApollo
  apolloClient: ApolloClient<any>;
}

export interface ApolloContext<Q extends DefaultQuery = DefaultQuery>
  extends NextAppContext<Q> {
  ctx: AppContext<Q>;
}