import Link from 'next/link'
import * as React from 'react'


const Layout: React.FunctionComponent = ({ children }) => (
  <div>
    <header>
      <nav>
        <Link href='/'><a>Home</a></Link> | {' '}
        <Link href='/list-class'><a>List Example</a></Link> | {' '}
        <Link href='/list-fc'><a>List Example (as Functional Component)</a></Link> | {' '}
        <Link href='/auth/sign-in'><a>Sign In</a></Link> | {' '}
        <Link href='/profile'><a>Profile</a></Link> | {' '}
        <Link href='/about'><a>About</a></Link> | {' '}
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
