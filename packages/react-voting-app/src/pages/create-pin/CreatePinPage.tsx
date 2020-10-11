import React, { useEffect, useState } from 'react';
import { Backdrop, Button, Card, CardContent, CircularProgress, Fab, FormControl, InputAdornment, InputLabel, makeStyles, OutlinedInput, Paper, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import api, { VotingOption } from '../../services/api';

const useStyles = makeStyles((theme) => ({
  CreatePinPage: {
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
  pinInput: {
    marginTop: theme.spacing(6),
  },
  pinConfirmInput: {
      marginTop: theme.spacing(6),
  },
  pinConfirmLabel: {
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
export type CreatePinPageProps = { 
  location: { 
    state: {
      passphrase: string[];
      hashId: string;
    } 
  }
}
function CreatePinPage(props: CreatePinPageProps) {
  const classes = useStyles();
  const { location } = props;
  const history = useHistory();
  const passphrase = location.state.passphrase;
  const hashId = location.state.hashId;
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState<string>();
  const [publicKey, setPublicKey] = useState<string>();
  const [validPin, setValidPin] = useState(false);
  const [votingOptions, setVotingOptions] = useState<VotingOption[]>();
  const [votingAddress, setVotingAddress] = useState<string>();
  const [isPinCreated, setIsPinCreated] = useState(false);

  const doRegister = async (hashId: string, publicKey: string) => {
    const activationMessage = await api.register(hashId, publicKey);
    console.log('registerResponse ', activationMessage);
    setVotingOptions(activationMessage.vopts);
    setVotingAddress(activationMessage.vaddrs);
  }

  useEffect(() => {
    console.log(`the passphrase is `, passphrase);
    const certificates = api.getMasterKeys(passphrase);
    setPublicKey(certificates.publicKey);
    console.log('Got certificates! ', certificates);
  }, [])

  useEffect(() => {
    if (!hashId || !publicKey) return;
  
    doRegister(hashId, publicKey);
  }, [publicKey]);

  const handlePinChange = (value: string) => {
    console.log(`PIN is ${value}`);
    setPin(value);
  }
  const handleConfirmPinChange = (value: string) => {
      console.log(`Confirm PIN is ${value}`);
      if (pin === value) {
          setValidPin(true)
      }
  }
  const handleCreateButton = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`OK`);
        setIsPinCreated(true);
      }, 1000);
  }

  const handleFabClick = () => {
    if (!passphrase || !pin) return;

    const encripted = api.encriptPassphrase(passphrase, pin);
    window.localStorage.setItem('encriptPassphrase', encripted);
    history.push({
      pathname: `/vote`,
      state: {
        votingOptions,
        votingAddress,
      }
    });
  }


  return (
    <div className={classes.CreatePinPage}>
      <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
          <Fab size="medium" disabled color="primary" aria-label="1">
              2
            </Fab> Create your PIN
          </Typography>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                   <Typography component="p" variant="body2" align="center">
                        Create a 5 digit PIN code that you will use to Vote
                    </Typography>
                    <FormControl className={classes.pinInput} variant="outlined">
                    <InputLabel htmlFor="outline-pin">PIN</InputLabel>
                    <OutlinedInput
                        id="outline-pin"
                        type={'text'}
                        onChange={e => handlePinChange(e.target.value)}
                        labelWidth={30}
                        endAdornment={
                        <InputAdornment position="end">
                            <EditIcon />
                        </InputAdornment>
                        }
                    />
                    </FormControl>
                    <Typography className={classes.pinConfirmLabel} component="p" variant="body2" align="center">
                        Confirm your PIN by typing it again bellow:
                    </Typography>
                    <FormControl className={classes.pinConfirmInput} variant="outlined">
                    <InputLabel htmlFor="outline-confirm-pin">Confirm PIN</InputLabel>
                    <OutlinedInput
                        id="outline-confirm-pin"
                        type={'text'}
                        onChange={e => handleConfirmPinChange(e.target.value)}
                        labelWidth={90}
                        endAdornment={
                        <InputAdornment position="end">
                            <EditIcon />
                        </InputAdornment>
                        }
                    />
                    </FormControl>
                    <FormControl className={classes.buttonInput}>
                        <Button disabled={!validPin} onClick={handleCreateButton} variant="outlined" color="primary">
                            Save PIN
                        </Button>
                    </FormControl>
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </CardContent>
              </div>
            </Card>
            <Fab 
                disabled={!isPinCreated}
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

export default CreatePinPage;
