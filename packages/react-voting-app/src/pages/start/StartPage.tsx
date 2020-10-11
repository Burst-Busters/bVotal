import React from 'react';
import './StartPage.css';
import { Card, CardContent, CardMedia, Divider, Fab, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  startPage: {
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
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
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
function StartPage() {
  const classes = useStyles();
  const history = useHistory();
  const handleGoClick = () => history.push(`/generate-passphrase`)
  return (
    <div className={classes.startPage}>
      <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="left">
            Vote in 3 easy steps
          </Typography>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                      <ListItemText 
                        primary="1. Create your Account" 
                        secondary="Create your secure voting account" />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                      <ListItemText 
                          primary="2. Create your PIN" 
                          secondary="The PIN allows you to place your vote" />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                      <ListItemText 
                        primary="3. Register for voting" 
                        secondary="And place your vote" />
                    </ListItem>
                  </List>
                </CardContent>
              </div>
              <CardMedia className={classes.cardMedia} image={`http://placehold.it/160x300`} title="asdasdas" />
            </Card>
            <Fab 
              onClick={handleGoClick} 
              className={classes.fab} 
              size="large" 
              color="secondary" 
              aria-label="go">
              GO!
            </Fab>
      </Paper>
    </div>
  );
}

export default StartPage;
