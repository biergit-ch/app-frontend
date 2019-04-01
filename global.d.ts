// tslint:disable-next-line:no-namespace
declare namespace NodeJS {
    interface Process {
      browser: boolean;
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      REACT_APP_API_URI: string;
      REACT_APP_AUTH0_DOMAIN: string;
      REACT_APP_AUTH0_CLIENT_ID: string;
      REACT_APP_AUTH0_CALLBACK_URI: string;
    }
    interface Global {
      fetch: function;
    }
  }