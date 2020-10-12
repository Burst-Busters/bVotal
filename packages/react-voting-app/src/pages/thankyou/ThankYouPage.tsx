import React from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, makeStyles, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  ThankYouPage: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    position: `relative`,
  },
  card: {
    display: 'flex',
    textAlign: `left`,
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  buttonInput: {
    display: `block`,
    clear: `both`, 
    marginTop: theme.spacing(3)
  },
  cardDetails: {
    flex: 1,
    textAlign: 'center',
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(-1),
    right: theme.spacing(2),
  },
}))

export type VotingOption = {
    key: number;
    title: string;
    description: string;
}


function ThankYouPage() {
  const classes = useStyles();

  return (
    <div className={classes.ThankYouPage}>
      <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Thank you!
          </Typography>
          <Card className={classes.root}>
            <Link style={{textDecoration: 'none', color: 'black'}} to="/">
              <CardActionArea>
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                          Your vote has been computed.
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Thank you for your vote. It has been sucessfully computed.
                          <br />
                          You can print a receipt if you want.
                      </Typography>
                  </CardContent>
              </CardActionArea>
            </Link>
            <CardActions>
                <Button size="small" color="primary">
                    Print
                </Button>
                <Button size="small" color="primary">
                    E-Mail
                </Button>
            </CardActions>
            </Card>
      </Paper>
    </div>
  );
}

export default ThankYouPage;
