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
    textAlign: 'center',
  },
  media: {
    height: 128,
    width: 128,
    objectFit: 'cover',
    margin: '0 auto'
  }
});
export interface ProfileProps {
  user: any;
}

export default function Profile(props: ProfileProps) {
  const classes = useStyles({});
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(props.user);

  React.useEffect(() => {
    if (props.user.authenticated) {
      props.user.getProfile().then((res: UserProfile) => {
        setUserProfile(res);
      })
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      // tslint:disable-next-line:no-console
      console.log("Cleanup");
    };
  });

  if (!userProfile) {
    return (
      <div className={classes.card}>
        <img src="/static/images/loading.svg" alt="loading" />
        <Typography component="p">
          Pouring Beer
        </Typography>
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