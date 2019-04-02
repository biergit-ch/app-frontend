import * as React from 'react'
import { NextContext } from 'next'
import Link from 'next/link';

import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { Auth0Authentication } from '../src/utils/auth/Auth0Authentication';
import { WebAuthentication } from '../src/utils/auth/WebAuthentication';

type Props = {
  auth: Auth0Authentication,
  pathname: string,
}

class ProfileClass extends React.Component<Props> {
  static async getInitialProps({ pathname }: NextContext) {
    // Example for including initial props in a Next.js page.
    // Don't forget to include the respective types for any
    // props passed into the component
    const auth: Auth0Authentication = new WebAuthentication();

    return { auth, pathname }
  }

  render() {
    const { auth, pathname } = this.props
    return (
      <Layout>
        <h1>Profile Example</h1>
        <p>You are currently on: {pathname}</p>
        <Profile auth={auth}/>
        <p><Link href='/'><a>Go home</a></Link></p>
      </Layout>
    )
  }
}

export default ProfileClass
