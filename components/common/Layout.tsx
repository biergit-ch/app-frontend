import * as React from 'react';
import AppNavBar from './AppNavBar';
import { Container, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useAuth0 } from '../../react-auth0-spa';
import Loading from './Loading';

interface LayoutProps {
  user: any;
  children: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    footer: {
      backgroundColor: theme.palette.primary.dark,
      padding: theme.spacing(2),
      textAlign: 'center',
      verticalAlign: 'middle',
      color: theme.palette.primary.contrastText,
      minHeight: '5vh',
      marginTop: 'auto',
    },
  }),
);

export default function Layout(props: LayoutProps) {
  const classes = useStyles({});
  const { loading }: any = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <header>
        <nav>
          <AppNavBar user={props.user} />
        </nav>
      </header>
      <Container maxWidth="sm" className={classes.main}>
        {props.children}
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          Made with <span role="img" aria-label="heart">❤️</span> in <b>Zurich</b>
        </Container>
      </footer>
    </div>
  );
}
