import * as React from 'react'
import AppNavBar from './AppNavBar';

interface LayoutProps {
  user: any;
}

export class Layout extends React.Component<LayoutProps>{

  constructor(props: LayoutProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <nav>
            <AppNavBar user={this.props.user} />
          </nav>
        </header>
        {this.props.children}
        <footer>
          <hr />
          <span>Footer</span>
        </footer>
      </div>
    )
  }
}

export default Layout
