/**
 * Contract for Auth0 configuration file
 * @export
 * @interface Auth0Config
 */
export interface Auth0Config {
  /**
   * @property
   * @type {string}
   * @memberof Auth0Config
   */
  domain: string;
  /**
   * @property
   * @type {string}
   * @memberof Auth0Config
   */
  clientID: string;
  /**
   * @property
   * @type {string}
   * @memberof Auth0Config
   */
  redirectUri: string;
  /**
  * @property
  * @type {string}
  * @memberof Auth0Config
  */
  responseType: string;
  /**
  * @property
  * @type {string}
  * @memberof Auth0Config
  */
  scope: string;
}