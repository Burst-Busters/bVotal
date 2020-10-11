import React, { useState } from 'react';
import { Avatar, Backdrop, Box, Button, Card, CardContent, CardMedia, Checkbox, Chip, CircularProgress, Divider, Fab, FormControl, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, OutlinedInput, Paper, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
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

export type VotingOption = {
    key: number;
    title: string;
    description: string;
}

const VotingOptions: VotingOption[] = [
    {key: 1, title: "Option 1", description: "This is option 1 - best candidate ever"},
    {key: 2, title: "Option 2", description: "This one saves the nation"},
    {key: 3, title: "Option 3", description: "This egomaniac politician wants your money"},
    {key: 4, title: "Option 4", description: "This guy is against Option 1"},
]

function VotePage() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleFabClick = () => alert(`voted!`);
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
                        {VotingOptions.map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                            <ListItem key={value.key} onClick={handleToggle(value)} button>
                                <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value.key}`}
                                    src={`/static/images/avatar/${value.key}.jpg`}
                                />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={value.title} secondary={value.description} />
                                <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(value)}
                                    checked={checked.indexOf(value) !== -1}
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
