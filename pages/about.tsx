import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Layout from '../components/common/Layout';
import { Auth0Authentication } from '../src/utils/auth/Auth0Authentication';

interface AboutProps {
  auth: Auth0Authentication;
}

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
}));

function About(props: AboutProps) {
  const classes = useStyles({});

  return (
    <Layout auth={props.auth}>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom={true}>
          ABOUT
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          about page
        </Typography>
        <Button variant="contained" color="primary">
          Sample Button
        </Button>
      </div>
    </Layout>
  );
}

export default About;
