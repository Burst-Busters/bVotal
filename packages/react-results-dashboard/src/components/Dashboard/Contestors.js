import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo) {
  return { id, date, name, shipTo};
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'The grestes singer'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'It is a Bass Player'),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Big Drummer'),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'It is a singer and dancer'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Very well known'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Contestors() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Contestants</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
      
      </div>
    </React.Fragment>
  );
}
