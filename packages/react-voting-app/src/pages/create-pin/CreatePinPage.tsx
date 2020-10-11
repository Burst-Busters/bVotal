import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    Backdrop,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Fab,
    FormControl,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    Paper,
    Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {useHistory} from 'react-router-dom';
import * as Services from "../../services"
import {VotingOption} from "../../typings";

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
            passphrase: string;
            hashId: string;
        }
    }
}

function CreatePinPage(props: CreatePinPageProps) {
    const classes = useStyles();
    const {location} = props;
    const history = useHistory();
    const passphrase = location.state.passphrase;
    const hashId = location.state.hashId;
    const [loading, setLoading] = useState(false);
    const [pin, setPin] = useState<string>();
    const [publicKey, setPublicKey] = useState<string>();
    const [validPin, setValidPin] = useState(false);
    const [votingOptions, setVotingOptions] = useState<VotingOption[]>();
    const [votingAddress, setVotingAddress] = useState<string>();

    const doRegister = async (hashId: string, publicKey: string) => {
        try {
            setLoading(true)
            const {vaddrs, vopts} = await Services.Eligibility.register(hashId, publicKey);
            setVotingOptions(vopts);
            setVotingAddress(vaddrs);
        } catch (e) {
            console.error(e)
            // TODO: how to handle?
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const {publicKey} = Services.Security.generateKeys(passphrase);
        setPublicKey(publicKey);
    }, [])

    useEffect(() => {
        if (!hashId || !publicKey) return;
        doRegister(hashId, publicKey);
    }, [publicKey]);

    const handlePinChange = (pin: string) => {
        setPin(pin);
    }
    const handleConfirmPinChange = (confirmingPin: string) => {
        setValidPin(pin === confirmingPin)
    }

    const handleFabClick = () => {

        Services.Security.storePassphrase(passphrase, pin!)

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
                                            <EditIcon/>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Typography className={classes.pinConfirmLabel} component="p" variant="body2"
                                        align="center">
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
                                            <EditIcon/>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Backdrop className={classes.backdrop} open={loading}>
                                <CircularProgress color="inherit"/>
                            </Backdrop>
                        </CardContent>
                    </div>
                </Card>
                <Fab
                    disabled={!validPin}
                    onClick={handleFabClick}
                    className={classes.fab}
                    size="large"
                    color="secondary"
                    aria-label="go">
                    Next
                </Fab>
            </Paper>
        </div>
    );
}

export default CreatePinPage;
