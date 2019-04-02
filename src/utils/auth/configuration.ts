    
import { Auth0Config } from './Auth0Config';
export const AUTH_CONFIG: Auth0Config = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  callbackUrl: process.env.AUTH0_CALLBACK_URI,
};