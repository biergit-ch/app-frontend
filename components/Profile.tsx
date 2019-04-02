import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { UserProfile } from '../src/models';
import { Auth0Authentication } from '../src/utils/auth/Auth0Authentication';
import loading from '../static/images/loading.svg';

const useStyles = makeStyles({
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
export interface ProfileProps {
  auth: Auth0Authentication;
}

function Profile(props: ProfileProps) {
  const classes = useStyles({});
  // tslint:disable-next-line:no-debugger
  debugger;
  const [userProfile, setUserProfile] = React.useState<UserProfile>(props.auth.userProfile);

  React.useEffect(() => {
    // tslint:disable-next-line:no-debugger
    debugger;
    props.auth.getProfile().then((res: UserProfile) => {
      setUserProfile(res);
    })
    // Specify how to clean up after this effect:
    return function cleanup() {
      // tslint:disable-next-line:no-console
      console.log("Cleanup");
    };
  });

  if (!userProfile) {
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
                  image={userProfile.picture}
                  title={userProfile.name}
                />
                <CardContent>
                  <Typography gutterBottom={true} variant="h5" component="h2">
                    {userProfile.name}
                  </Typography>
                  <pre>
                    <Typography component="p">
                      {JSON.stringify(userProfile, null, 2)}
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

export default Profile;