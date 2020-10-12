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
import PinInput from '../../components/PinInput/PinInput';

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
    const [pin, setPin] = useState<string>();
    const [validPin, setValidPin] = useState(false);

    const handlePinChange = (pin: string) => {
        setPin(pin);
    }
    const handleConfirmPinChange = (confirmingPin: string) => {
        setValidPin(pin === confirmingPin)
    }

    const handleFabClick = () => {

        Services.Security.storePassphrase(passphrase, pin!)
        const {publicKey} = Services.Security.generateKeys(passphrase);
        // TODO: go to wating screen
        history.push({
            pathname: `/activation`,
            state: {
                publicKey,
            }
        });
    }

    return (
        <div className={classes.CreatePinPage}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5" align="center">
                    <Fab size="medium" disabled color="primary" aria-label="1">
                        2
                    </Fab> Define your Voting PIN
                </Typography>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="p" variant="body2" align="center">
                                Create a 5 digit PIN code that you will use to Vote
                            </Typography>
                            <PinInput onChange={handlePinChange} />
                            <Typography className={classes.pinConfirmLabel} component="p" variant="body2"
                                        align="center">
                                Confirm your PIN by typing it again below:
                            </Typography>
                            <FormControl className={classes.pinConfirmInput} variant="outlined">
                                <PinInput onChange={handleConfirmPinChange} />
                            </FormControl>
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
