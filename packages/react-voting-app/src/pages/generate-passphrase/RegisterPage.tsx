import React, { useState } from 'react';
import { Backdrop, Box, Button, Card, CardContent, Chip, CircularProgress, Fab, FormControl, InputAdornment, InputLabel, makeStyles, OutlinedInput, Paper, Typography } from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { useHistory } from 'react-router-dom';
import DateSelect from '../../components/DateSelect/DateSelect';
import RegisterConfirmationDialog from '../../components/register-confirmation/RegisterConfirmationDialog';
const useStyles = makeStyles((theme) => ({
  RegisterPage: {
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
  docInput: {
    marginTop: theme.spacing(6),
    width: 360
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
  passphraseStats: {
    marginTop: theme.spacing(3),
  },
  chip: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}))
function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [chosenDate, setChosenDate] = useState<string>();
  const [document, setDocument] = useState<string>();
  const [passphrase, setPassphrase] = useState<string[]>([]);
  const handleDocChange = (value: string) => setDocument(value);
  const handleFabClick = () => history.push(`/create-pin`)
  const onChangedDate = (dateString: string) => {
    setChosenDate(dateString);
  }
  const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setPassphrase([`example`, `pass`, `phrase`, `with`, `some`, `words`, `2example`, `2pass`, `2phrase`, `2with`, `2some`, `2words`])
      }, 1000);
  }


  return (
    <div className={classes.RegisterPage}>
      <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
          <Fab size="medium" disabled color="primary" aria-label="1">
              1
            </Fab> Create your Account
          </Typography>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                   <Typography component="p" variant="body2" align="center">
                        Input your date of birth and document number to get started:
                    </Typography>
                    <DateSelect onChange={onChangedDate} />
                    <FormControl className={classes.docInput} variant="outlined">
                      <InputLabel htmlFor="outline-doc">National Identification Number</InputLabel>
                      <OutlinedInput
                          id="outline-doc"
                          type={'text'}
                          onChange={e => handleDocChange(e.target.value)}
                          labelWidth={225}
                          endAdornment={
                          <InputAdornment position="end">
                              <AssignmentIndIcon />
                          </InputAdornment>
                          }
                      />
                    </FormControl>
                    <FormControl className={classes.buttonInput}>
                      <RegisterConfirmationDialog onConfirm={handleConfirm} dateString={chosenDate} document={document} />
                    </FormControl>
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Box className={classes.passphraseStats} component="div" m={1}>
                        {
                            passphrase.map(word => (
                                <Chip
                                    className={classes.chip} 
                                    key={word}
                                    label={word}
                                />
                            ))
                        }
                    </Box>
                </CardContent>
              </div>
            </Card>
            <Fab 
                onClick={handleFabClick}
                disabled={passphrase.length < 12} 
                className={classes.fab} size="large" 
                color="secondary" 
                aria-label="go">
              Next
            </Fab>
      </Paper>
    </div>
  );
}

export default RegisterPage;
