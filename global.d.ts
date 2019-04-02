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

declare module "*.svg" {
  const content: any;
  export default content;
}