import * as React from 'react';

import Profile from '../components/Profile';
import PrivateRoute from '../components/common/PrivateRoute';

export default function ProfileClass() {
  return (
    <div>
      <h1>Profile Example</h1>
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    </div>
  );
}
