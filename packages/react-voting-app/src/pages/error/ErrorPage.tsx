import React, { useState } from 'react';
import { Avatar, Backdrop, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Checkbox, Chip, CircularProgress, Divider, Fab, FormControl, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, OutlinedInput, Paper, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import WarningIcon from '@material-ui/icons/Warning';
import { useHistory } from 'react-router-dom';
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

const VotingOptions: VotingOption[] = [
    {key: 1, title: "Option 1", description: "This is option 1 - best candidate ever"},
    {key: 2, title: "Option 2", description: "This one saves the nation"},
    {key: 3, title: "Option 3", description: "This egomaniac politician wants your money"},
    {key: 4, title: "Option 4", description: "This guy is against Option 1"},
]

function ErrorPage() {
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
