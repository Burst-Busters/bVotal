import React, {useState} from 'react';
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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {useHistory} from 'react-router-dom';
import DateSelect from '../../components/DateSelect/DateSelect';
import RegisterConfirmationDialog from '../../components/register-confirmation/RegisterConfirmationDialog';
import * as Services from '../../services';
import {Security} from '../../services';
import {formatDateToBurst} from '../../utils';
import {IS_ELIGIBLE_ENUM} from "../../typings";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";


function sleep(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time || 1000);
    });
}


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
    backButton: {
        marginTop: theme.spacing(3),
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
    const [passphrase, setPassphrase] = useState<string>('');
    const [hashId, setHashId] = useState<string>('');
    const [isEligible, setIsEligible] = useState<IS_ELIGIBLE_ENUM>(IS_ELIGIBLE_ENUM.PENDING);

    const doRegister = async (hashId: string, publicKey: string) => {
        try {
            setLoading(true)
            await sleep(2500) // fake delay
            await Services.Eligibility.register(hashId, publicKey);
            setIsEligible(IS_ELIGIBLE_ENUM.YES)
            return
        } catch (e) {
            setIsEligible(IS_ELIGIBLE_ENUM.NO)
        } finally {
            setLoading(false)
        }
    }

    const handleDocChange = (value: string) => setDocument(value);
    const handleFabClick = async () => {
        if(isEligible === IS_ELIGIBLE_ENUM.YES){
            history.push({
                pathname: `/create-pin`,
                state: {passphrase, hashId},
            })
        }
    }
    const onChangedDate = (dateString: string) => {
        setChosenDate(formatDateToBurst(dateString));
        console.log(formatDateToBurst(dateString));
    }
    const handleConfirm = async () => {
        const newHashId = Security.getHashId(document!, chosenDate!);
        const phrase = await Security.generatePassphrase(newHashId);
        setHashId(newHashId);
        setPassphrase(phrase);
        const {publicKey} = Services.Security.generateKeys(passphrase);
        await doRegister(newHashId, publicKey)
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
                        {
                            // TODO: would be better as a sinlge page
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
                        { isEligible === IS_ELIGIBLE_ENUM.PENDING &&
                            <CardContent>
                                <Typography component="p" variant="body2" align="center">
                                    Input your date of birth and document number to get started:
                                </Typography>
                                <DateSelect onChange={onChangedDate}/>
                                <FormControl className={classes.docInput} variant="outlined">
                                    <InputLabel htmlFor="outline-doc">National Identification Number</InputLabel>
                                    <OutlinedInput
                                        id="outline-doc"
                                        type={'text'}
                                        onChange={e => handleDocChange(e.target.value)}
                                        labelWidth={225}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <AssignmentIndIcon/>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl className={classes.buttonInput}>
                                    <RegisterConfirmationDialog onConfirm={handleConfirm} dateString={chosenDate}
                                                                document={document}/>
                                </FormControl>
                                <Backdrop className={classes.backdrop} open={loading}>
                                    <Typography variant="h2" align="center">
                                        Checking Eligibility
                                    </Typography>
                                    <CircularProgress color="inherit"/>
                                </Backdrop>
                            </CardContent>
                        }
                    </div>
                </Card>
                <Fab
                    onClick={handleFabClick}
                    disabled={isEligible !== IS_ELIGIBLE_ENUM.YES}
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
