import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Layout from '../components/common/Layout';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
}));

function About() {
  const classes = useStyles({});

  return (
    <Layout>
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
