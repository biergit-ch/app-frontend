import Link from 'next/link';
import * as React from 'react'

import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { Auth0Authentication } from '../src/utils/auth/Auth0Authentication';

interface Props {
  auth: Auth0Authentication,
  pathname: string,
}

class ProfileClass extends React.Component<Props> {
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
