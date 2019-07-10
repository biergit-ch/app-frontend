import Link from 'next/link';
import * as React from 'react';

import Layout from '../components/common/Layout';
import Profile from '../components/Profile';

interface ProfileProps {
  user: any;
  pathname: string;
}

export default function ProfileClass(props: ProfileProps) {
  return (
    <Layout user={props.user}>
      <h1>Profile Example</h1>
      <p>You are currently on: {props.pathname}</p>
      <Profile user={props.user} />
      <p><Link href='/'><a>Go home</a></Link></p>
    </Layout>
  );
}
