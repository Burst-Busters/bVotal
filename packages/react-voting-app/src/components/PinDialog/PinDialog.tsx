import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@material-ui/core';
import PinInput from '../PinInput/PinInput';
import {VotingOption} from "../../typings";

export type PinDialogProps = {
    option?: VotingOption;
    open: boolean,
    setOpen: (value: boolean) => void;
    onConfirm: (pin: string) => void;
}

export default function PinDialog(props: PinDialogProps) {
    const { option, onConfirm, open, setOpen } = props;
    const [pin, setPin] = useState<string>('');
    const handlePinChange = (value: string) => setPin(value);
    const handleConfirm = () => {
        handleClose();
        onConfirm(pin);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Please type your 5 Digit PIN to vote"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Typography>
                    <b>You vote for: </b> {option?.title}
                </Typography>

            </DialogContentText>
            <PinInput onChange={handlePinChange} />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
                Confirm Vote
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
