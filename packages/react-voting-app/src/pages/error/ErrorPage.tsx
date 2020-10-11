import React from 'react';
import { Card, CardActionArea, CardContent, makeStyles, Paper, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
const useStyles = makeStyles((theme) => ({
  ErrorPage: {
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


function ErrorPage() {
  const classes = useStyles();

  return (
    <div className={classes.ErrorPage}>
      <Paper className={classes.paper}>
          <WarningIcon fontSize={`large`} />
          <Typography component="h1" variant="h5" align="center">
            Error
          </Typography>
          <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        There was an error. Please go back and try again.
                    </Typography>
                 
                </CardContent>
            </CardActionArea>
            </Card>
      </Paper>
    </div>
  );
}

export default ErrorPage;
