import { Theme, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { createStyles, WithStyles } from '@material-ui/styles';
import { ApolloClient } from 'apollo-boost';
import React from 'react';
import Layout from '../components/common/Layout';
import PokemonList from '../components/PokemonList';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(20),
    },
  });


interface Props extends WithStyles<typeof styles> {
  pathname: string,
  apollo: ApolloClient<any>,
  user: any
}

interface State {
  open: boolean;
}

class Index extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    debugger;
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
    const { classes, user } = this.props;
    debugger;
    return (
      <Layout user={user}>
        <div className={classes.root}>
          <Dialog open={this.state.open} onClose={() => this.handleClose()}>
            <DialogTitle>Pokemons</DialogTitle>
            <DialogContent>
              <PokemonList />
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
            index
        </Typography>
          <Button variant="contained" color="secondary" onClick={() => this.handleClick()}>
            Show Pokemons
        </Button>
        </div>
      </Layout>
    );
  }

}

export default withStyles(styles as any)(Index as any);
