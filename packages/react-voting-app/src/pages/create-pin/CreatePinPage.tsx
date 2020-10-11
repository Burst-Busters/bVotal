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
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import EditIcon from '@material-ui/icons/Edit';
import {useHistory} from 'react-router-dom';
import * as Services from "../../services"
import {IS_ELIGIBLE_ENUM, VotingOption} from "../../typings";
import {Eligibility} from "../../services";

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
    backButton: {
        marginTop: theme.spacing(3),
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
    const [isEligible, setIsEligible] = useState<IS_ELIGIBLE_ENUM>(IS_ELIGIBLE_ENUM.FETCHING);
    const [pin, setPin] = useState<string>();
    const [publicKey, setPublicKey] = useState<string>();
    const [validPin, setValidPin] = useState(false);
    const [votingOptions, setVotingOptions] = useState<VotingOption[]>();
    const [votingAddress, setVotingAddress] = useState<string>();

    const doRegister = async (hashId: string, publicKey: string) => {
        try {
            setLoading(true)
            await Services.Eligibility.register(hashId, publicKey);
            setIsEligible(IS_ELIGIBLE_ENUM.YES);
            Services.Eligibility.waitForActivationMessage(publicKey)
        } catch (e) {
            console.error(e)
            setIsEligible(IS_ELIGIBLE_ENUM.NO);
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
                        {
                            isEligible === IS_ELIGIBLE_ENUM.NO &&
                            <CardContent>
                                <Typography component="h2" variant="h5" align="center">
                                    Sorry, you are not eligible to vote now.
                                </Typography>
                                <Typography component="p" variant="body2" align="center">
                                    Maybe you are not registered to vote, or you already voted.
                                </Typography>
                                <Button
                                    variant="contained"
                                    href="/"
                                    color="secondary"
                                    className={classes.backButton}
                                    startIcon={<AssignmentReturnIcon />}
                                >
                                    Go Back
                                </Button>
                            </CardContent>
                        }
                        { isEligible === IS_ELIGIBLE_ENUM.YES &&
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
                        }
                    </div>
                </Card>
                {
                    isEligible === IS_ELIGIBLE_ENUM.YES &&
                    <Fab
                        disabled={!validPin}
                        onClick={handleFabClick}
                        className={classes.fab}
                        size="large"
                        color="secondary"
                        aria-label="go">
                        Next
                    </Fab>
                }
            </Paper>
        </div>
    );
}

export default CreatePinPage;
