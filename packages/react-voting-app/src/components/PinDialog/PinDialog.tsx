import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@material-ui/core';

export type PinDialogProps = {
    document?: string;
    open: boolean,
    setOpen: (value: boolean) => void;
    onConfirm: (pin: string) => void;
}

export default function PinDialog(props: PinDialogProps) {
    const { document, onConfirm, open, setOpen } = props;
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
            <DialogTitle id="alert-dialog-title">{"Is the information correct?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Typography>
                    <b>Document: </b> {document}
                </Typography>

            </DialogContentText>
            <FormControl variant="outlined">
                <InputLabel htmlFor="outline-doc">5 Digit PIN</InputLabel>
                <OutlinedInput
                    id="outline-doc"
                    type={'text'}
                    onChange={e => handlePinChange(e.target.value)}
                    labelWidth={125}
                    endAdornment={
                        <InputAdornment position="end">
                            <VpnKeyIcon/>
                        </InputAdornment>
                    }
                />
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
                I Agree
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
