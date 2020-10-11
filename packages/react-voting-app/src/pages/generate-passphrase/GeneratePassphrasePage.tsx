import React, { useState } from 'react';
import { Backdrop, Box, Button, Card, CardContent, Chip, CircularProgress, Fab, FormControl, InputAdornment, InputLabel, makeStyles, OutlinedInput, Paper, Typography } from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import { useHistory } from 'react-router-dom';
import DateSelect from '../../components/DateSelect/DateSelect';
const useStyles = makeStyles((theme) => ({
  GeneratePassphrasePage: {
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
  phoneInput: {
    marginTop: theme.spacing(6),
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
function GeneratePassphrasePage() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [passphrase, setPassphrase] = useState<string[]>([]);
  const handlePhoneChange = (value: string) => console.log(`phone is ${value}`)
  const handleFabClick = () => history.push(`/create-pin`)
  const handleGenerateButton = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setPassphrase([`example`, `pass`, `phrase`, `with`, `some`, `words`, `2example`, `2pass`, `2phrase`, `2with`, `2some`, `2words`])
      }, 1000);
  }


  return (
    <div className={classes.GeneratePassphrasePage}>
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
                        Input your phone number and generate a custom passphrase.
                    </Typography>
                    <DateSelect />
                    <FormControl className={classes.phoneInput} variant="outlined">
                      <InputLabel htmlFor="outline-phone">phone</InputLabel>
                      <OutlinedInput
                          id="outline-phone"
                          type={'text'}
                          onChange={e => handlePhoneChange(e.target.value)}
                          labelWidth={45}
                          endAdornment={
                          <InputAdornment position="end">
                              <PhoneIphoneIcon />
                          </InputAdornment>
                          }
                      />
                    </FormControl>
                    <FormControl className={classes.buttonInput}>
                        <Button disabled={passphrase.length > 0} onClick={handleGenerateButton} variant="outlined" color="primary">
                            Generate
                        </Button>
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

export default GeneratePassphrasePage;
