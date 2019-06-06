import Link from 'next/link';
import * as React from 'react'

import Layout from '../components/common/Layout'
import Profile from '../components/Profile'

interface Props {
  user: any,
  pathname: string,
}

class ProfileClass extends React.Component<Props> {
  render() {
    const { user, pathname } = this.props
    return (
      <Layout user={user}>
        <h1>Profile Example</h1>
        <p>You are currently on: {pathname}</p>
        <Profile user={user} />
        <p><Link href='/'><a>Go home</a></Link></p>
      </Layout>
    )
  }
}

export default ProfileClass
