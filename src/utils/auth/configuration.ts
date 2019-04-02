    
import { Auth0Config } from './Auth0Config';
export const AUTH_CONFIG: Auth0Config = {
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  redirectUri: process.env.AUTH0_CALLBACK_URI,
  responseType: 'token id_token',
  scope:'openid profile email read:messages write:messages',
};