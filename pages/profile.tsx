import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Layout from '../components/Layout';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
}));

function Profile() {
  const classes = useStyles({});

  return (
    <Layout>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom={true}>
          PROFILE
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          about page
        </Typography>
        <Profile />
      </div>
    </Layout>
  );
}

export default Profile;
