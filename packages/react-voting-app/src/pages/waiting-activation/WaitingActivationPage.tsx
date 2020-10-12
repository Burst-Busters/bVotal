import React, {useEffect} from 'react';
import {Card, CardActions, CardContent, makeStyles, Paper, Typography} from '@material-ui/core';
import ReactLoading from "react-loading";
import {useHistory} from 'react-router-dom';
import {Eligibility} from "../../services";

const useStyles = makeStyles((theme) => ({
    WaitingActivationPage: {
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
    loading: {
        textAlign: `center`,
        margin: '0 auto',
    },
}))

type Props = {
    location: {
        state: {
            publicKey: string;
        }
    }
}

function WaitingActivationPage(props: Props) {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        let polling: {stop: () => void}
        async function wait() {
            polling = await Eligibility.waitForActivationMessage(props.location.state.publicKey);
        }

        wait()

        function gotoVotingPage() {
            const votingAddress = Eligibility.getVotingAddress();
            const votingOptions = Eligibility.getVotingOptions();
            history.push({
                pathname: `/vote`,
                state: {
                    votingOptions,
                    votingAddress,
                }
            });
        }

        window.addEventListener('@bvotal/activated', gotoVotingPage)
        return () => {
            window.removeEventListener('@bvotal/activated', gotoVotingPage)
            if(polling){
                polling.stop()
            }
        }
    }, [])

    return (
        <div className={classes.WaitingActivationPage}>
            <Paper className={classes.paper}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Activating your account
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            You are eligible to vote.
                            <br/>
                            Your account is now being activated.
                            <br/>
                            Please allow up to 5 minutes, and the results will be shown in this page:
                        </Typography>
                    </CardContent>
                    <CardActions style={{alignItems: 'center'}}>
                        <ReactLoading delay={1000} width={120} height={120} className={classes.loading} type={'bubbles'}
                                      color="green"/>
                    </CardActions>
                </Card>
            </Paper>
        </div>
    );
}

export default WaitingActivationPage;
