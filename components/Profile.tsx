import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import * as React from 'react';
import { UserProfile } from '../src/models';
import { Auth0Authentication } from '../src/utils/auth/Auth0Authentication';
import loading from './../src/utils/loading/loading.svg';
import './Profile.css';

export interface ProfileState {
  profile?: UserProfile;
}

export interface ProfileProps extends WithStyles<typeof styles> {
  auth: Auth0Authentication;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    card: {
      maxWidth: 345,
      margin: '0 auto',
      justifyContent: 'center',
    },
    media: {
      height: 128,
      width: 128,
      objectFit: 'cover',
      margin: '0 auto'
    }
  });

export const Profile = withStyles(styles)(
    class Profile extends React.Component<
      ProfileProps & WithStyles<keyof typeof styles>,
      ProfileState
    > {
      state: ProfileState = {};
      componentWillMount() {
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
          getProfile().then((profile: any) => this.setState({ profile }));
        } else {
          this.setState({ profile: userProfile });
        }
      }
      render() {
        const { classes } = this.props;
        const { profile } = this.state;
        if (!profile) {
          return (
            <div>
              <img src={loading} alt="loading" />
            </div>
          );
        } else {
          return (
            <div className={classes.root}>
              <Grid
                container={true}
                spacing={0}
                justify="center"
                style={{ padding: 1 }}
              >
                <Grid item={true} xs={3}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={profile.picture}
                        title={profile.name}
                      />
                      <CardContent>
                        <Typography gutterBottom={true} variant="h5" component="h2">
                          {profile.name}
                        </Typography>
                        <pre>
                          <Typography component="p">
                            {JSON.stringify(profile, null, 2)}
                          </Typography>
                        </pre>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            </div>
          );
        }
      }
    }
  );
  