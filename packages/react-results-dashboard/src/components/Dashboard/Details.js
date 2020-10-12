import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Details() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Expected Voters</Title>
      <Typography component="p" variant="h4">
        50,024
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        ends on<br />15 October, 2020<br />8:15PM
      </Typography>
      <div>
      </div>
    </React.Fragment>
  );
}
