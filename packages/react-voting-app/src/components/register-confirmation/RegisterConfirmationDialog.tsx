import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

export type RegisterConfirmationDialogProps = {
    dateString?: string;
    document?: string;
    onConfirm: () => void;
}

export default function RegisterConfirmationDialog(props: RegisterConfirmationDialogProps) {
    const { dateString, document, onConfirm } = props;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleConfirm = () => {
        handleClose();
        onConfirm();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Button disabled={!dateString || !document} variant="outlined" color="primary" onClick={handleClickOpen}>
            Confirm
        </Button>
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
                <Typography>
                    <b>Date of Birth: </b> {dateString}
                </Typography>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Disagree
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
