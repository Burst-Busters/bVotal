import React, { useState } from 'react';
import { Avatar, Backdrop, Card, CardContent, Checkbox, CircularProgress, Fab, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Radio, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {VotingAddress, VotingOption} from "../../typings";
const useStyles = makeStyles((theme) => ({
  VotePage: {
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

export type VotePageProps = {
  location: {
    state: {
      votingOptions: VotingOption[],
      votingAddress: VotingAddress,
    }
  }
}

function VotePage(props: VotePageProps) {
  const classes = useStyles();
  const { location } = props;
  const history = useHistory();
  const votingOptions = location.state.votingOptions;
  const votingAddress = location.state.votingAddress;
  const [loading] = useState(false);
  const handleFabClick = () => history.push(`/thank-you`);
  const [checked, setChecked] = React.useState<VotingOption[]>([]);

  const handleToggle = (value: VotingOption) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className={classes.VotePage}>
      <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
          <Fab size="medium" disabled color="primary" aria-label="1">
              3
            </Fab> Place your Vote
          </Typography>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                   <Typography component="p" variant="body2" align="center">
                        What is your vote?
                    </Typography>

                    <List dense className={classes.root}>
                        {votingOptions.map((value) => {
                            const labelId = `radio-vote-${value}`;
                            return (
                            <ListItem key={value.key} onClick={handleToggle(value)} button>
                                <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value.key}`}
                                    src={`/static/images/avatar/${value.key}.jpg`}
                                />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={value.title} secondary={value.desc} />
                                <ListItemSecondaryAction>
                                  <Radio
                                    edge="end"
                                    checked={checked.indexOf(value) !== -1}
                                    onChange={handleToggle(value)}
                                    value={value.key}
                                    name="radio-button-vote"
                                    inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </ListItemSecondaryAction>
                            </ListItem>
                            );
                        })}
                        </List>
                    
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </CardContent>
              </div>
            </Card>
            <Fab 
                onClick={handleFabClick}
                className={classes.fab}
                size="large"
                color="secondary"
                aria-label="go">
                Vote!
            </Fab>
      </Paper>
    </div>
  );
}

export default VotePage;
