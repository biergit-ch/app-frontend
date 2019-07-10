import { Theme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, WithStyles } from '@material-ui/styles';
import React from 'react';
import Layout from '../components/common/Layout';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(20),
    },
  });

interface IndexProps extends WithStyles<typeof styles> {
  pathname: string;
  user: any;
}

export function Index(props: IndexProps) {

  return (
    <Layout user={props.user}>
      <div className={props.classes.root}>
        <Typography variant="h4" gutterBottom={true}>
          BIERGIT
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          index
        </Typography>
      </div>
    </Layout>
  );
}

export default withStyles(styles)(Index);
