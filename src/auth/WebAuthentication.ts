import { Auth0DecodedHash, WebAuth } from 'auth0-js';
import autobind from 'autobind-decorator';
import { UserProfile } from '../models';
import history from '../utils/History';
import { Auth0Authentication } from './Auth0Authentication';

/**
 * Web based Auth0 authentication
 *
 * @export
 * @class WebAuthentication
 * @implements {Auth0Authentication}
 */
export class WebAuthentication implements Auth0Authentication {
  /**
   * @property
   * @type {number}
   * @memberof WebAuthentication
   */
  // tslint:disable-next-line:no-any
  tokenRenewalTimeout!: number;
  /**
   * @property
   * @readonly
   * @memberof WebAuthentication
   */
  get accessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  /**
   * @private
   * @memberof WebAuthentication
   */
  requestedScopes = 'openid profile email read:messages write:messages';

  /**
   * @property
   * @private
   * @type {WebAuth}
   * @memberof WebAuthenticationManager
   */
  auth0: WebAuth = new WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URI,
    responseType: 'token id_token',
    scope: this.requestedScopes,
  });

  get authenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;
  }

  /**
   * @property
   * @type {UserProfile}
   * @memberof WebAuthentication
   */
  userProfile!: UserProfile | null;

  /**
   * Creates instance of web authentication using Auth0
   */
  constructor() {
    this.scheduleRenewal();
  }

  /**
   * Get user profile from local storage
   *
   * @returns {Promise<UserProfile>}
   * @memberof WebAuthentication
   */
  @autobind
  getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken = this.accessToken;
      this.auth0.client.userInfo(
        accessToken,
        (error: any, profile: any) => {
          if (error) {
            reject(error);
          } else {
            this.userProfile = profile;
            resolve(this.userProfile);
          }
        },
      );
    });
  }

  @autobind
  login(): void {
    this.auth0.authorize();
  }

  @autobind
  handleAuthentication(): void {
    this.auth0.parseHash((e: any, result: any) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);
        history.replace('/home');
      } else if (e) {
        history.replace('/');
        // tslint:disable-next-line:no-console
        console.error(e);
        alert(`Error: ${e.error}. Check the console for further details.`);
      }
    });
  }

  @autobind
  setSession(authResult: Auth0DecodedHash): void {
    const { accessToken, expiresIn, idToken, scope } = authResult;
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(expiresIn! * 1000 + new Date().getTime());
    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    // tslint:disable-next-line:no-string-literal
    const scopes = scope || this.requestedScopes || '';
    // const scopes = authResult.scope || this.requestedScopes || '';
    localStorage.setItem('access_token', accessToken!);
    localStorage.setItem('id_token', idToken!);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    // navigate to the home route
    history.replace('/home');
  }

  @autobind
  logout(): void {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    // navigate to the home route
    history.replace('/');
  }

  /**
   * @see {@link Auth0Authentication#renewToken}
   * @memberof WebAuthentication
   */
  renewToken(): void {
    this.auth0.renewAuth(
      {
        redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URI,
        usePostMessage: true,
        postMessageDataType: 'auth0:silent-authentication',
      },
      (err: any, result: any) => {
        if (err) {
          alert(
            `Could not get a new token using silent authentication (${
              err.error
            }).`,
          );
        } else {
          this.setSession(result);
          alert(`Successfully renewed auth!`);
        }
      },
    );
  }

  @autobind
  userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')!).split(
      ' ',
    );
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  /**
   * Reschedule token reneval
   * @private
   * @memberof WebAuthentication
   */
  private scheduleRenewal(): void {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = window.setTimeout(() => this.renewToken(), delay);
    }
  }
}