import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Layout from '../components/Layout';
import { Auth0Authentication } from '../src/utils/auth/Auth0Authentication';
import { ApolloClient } from 'apollo-boost';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
}));

interface Props {
  auth: Auth0Authentication,
  pathname: string,
  apollo: ApolloClient<any>
}

interface State {
  open: boolean;
}

class Index extends React.Component<Props, State> {
  classes = useStyles({});

  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      open: false,
    };
  }

  handleClose() {
    this.setState({ open: false });
  };
  handleClick() {
    this.setState({ open: true });
  };
  sampleGraphQLRequest() {
    // tslint:disable-next-line:no-console
    console.log("sampleGraphQLRequest");
  }

  render() {
    return (
      <Layout>
        <div className={this.classes.root}>
          <Dialog open={this.state.open} onClose={() => this.handleClose()}>
            <DialogTitle>Sample Dialog</DialogTitle>
            <DialogContent>
              <DialogContentText>1-2-3-4-5</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => this.sampleGraphQLRequest()}>
                GraphQL
            </Button>
              <Button color="primary" onClick={() => this.handleClose()}>
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
          <Button variant="contained" color="secondary" onClick={() => this.handleClick()}>
            Sample dialog
        </Button>
        </div>
      </Layout >
    );
  }

}

export default Index;
