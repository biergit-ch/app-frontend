import { Auth0DecodedHash, Auth0Error, WebAuth } from 'auth0-js';
import autobind from 'autobind-decorator';
import Router from 'next/router'
import { Auth0Authentication } from './Auth0Authentication';
import { AUTH_CONFIG } from './configuration';
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
   * @private
   * @type {WebAuth}
   * @memberof WebAuthenticationManager
   */
  auth0: WebAuth = new WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid',
  });

  get authenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;
  }

  @autobind
  login(): void {
    this.auth0.authorize();
  }

  @autobind
  handleAuthentication(): void {
    this.auth0.parseHash((e: Auth0Error, result: Auth0DecodedHash) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);
        Router.push('/index');
      } else if (e) {
        Router.push('/index');
        // tslint:disable-next-line:no-console
        console.error(e);
        alert(`Error: ${e.error}. Check the console for further details.`);
      }
    });
  }

  @autobind
  setSession(authResult: Auth0DecodedHash): void {
    const { accessToken, expiresIn, idToken } = authResult;
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(expiresIn! * 1000 + new Date().getTime());
    localStorage.setItem('access_token', accessToken!);
    localStorage.setItem('id_token', idToken!);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    Router.push('/index');
  }

  @autobind
  logout(): void {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    Router.push('/index');
  }
}