import React from 'react'

import { WebAuthentication } from '../../src/utils/auth/WebAuthentication';

export default class SignIn extends React.Component {
  componentDidMount () {
    const webAuth = new WebAuthentication();
    webAuth.login();
  }
  render () {
    return null
  }
}
