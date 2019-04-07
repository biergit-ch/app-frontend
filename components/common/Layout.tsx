import * as React from 'react'
import AppNavBar from './AppNavBar';

const Layout: React.FunctionComponent = ({ children }) => (
  <div>
    <header>
      <nav>
        <AppNavBar auth={children.auth}/>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>Footer</span>
    </footer>
  </div>
)

export default Layout
