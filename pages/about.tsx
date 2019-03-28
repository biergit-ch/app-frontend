import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
}));

function About() {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        ABOUT
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        about page
      </Typography>
      <Typography gutterBottom>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Typography>
      <Button variant="contained" color="primary">
        Sample Button
      </Button>
    </div>
  );
}

export default About;
