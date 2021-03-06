import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import Link from 'next/link';
import * as React from 'react';

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});


export interface AppNavBarProps extends WithStyles<typeof styles> {
  user: any;
}
class AppNavBar extends React.Component<AppNavBarProps>{

  signInLink = React.forwardRef((_props, _ref) => <Link href="/auth/sign-in"><a>signin</a></Link>);
  signOutLink = React.forwardRef((_props, _ref) => <Link href="/auth/sign-out"><a>signout</a></Link>);
  profileLink = React.forwardRef((_props, _ref) => <Link href="/profile-class"><a>profile</a></Link>);
  groupLink = React.forwardRef((_props, _ref) => <Link href="/group?title=Group12" as="g/Group12"><a>group</a></Link>);
  aboutLink = React.forwardRef((_props, _ref) => <Link href="/about"><a>about</a></Link>);

  constructor(props: AppNavBarProps) {
    super(props);
    // tslint:disable-next-line:no-debugger
    debugger;
  }

  render() {
    // tslint:disable-next-line:no-debugger
    debugger;
    const { classes } = this.props;
    const authenticated = false;
    // const authenticated = this.props.auth.authenticated;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu">
              <HomeIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              style={{ textAlign: 'left' }}>
              Biergit
            </Typography>
            {authenticated && (
              <Button color="inherit" component={this.aboutLink} />
            )}
            {authenticated && (
              <Button color="inherit" component={this.groupLink} />
            )}
            {authenticated && (
              <Button color="inherit" component={this.profileLink} />
            )}
            {!authenticated && (
              <Button color="inherit" component={this.signInLink} />
            )}
            {authenticated && (
              <Button color="inherit" component={this.signOutLink} />
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles as any, { withTheme: true })(AppNavBar as any);