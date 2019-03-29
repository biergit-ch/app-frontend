import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
}));

function Index() {
  const classes = useStyles({});
  const [open, setState] = React.useState(false);

  const handleClose = () => {
    setState(false);
  };
  const handleClick = () => {
    setState(true);
  };

  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sample Dialog</DialogTitle>
        <DialogContent>
          <DialogContentText>1-2-3-4-5</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" gutterBottom={true}>
        BIERGIT
      </Typography>
      <Typography variant="subtitle1" gutterBottom={true}>
        app-frontend
      </Typography>
      <Typography gutterBottom={true}>
        <Link href="/about">
          <a>about biergit</a>
        </Link>
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Sample dialog
      </Button>
    </div>
  );
}

export default Index;
