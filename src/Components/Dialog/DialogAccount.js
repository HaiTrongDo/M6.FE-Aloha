import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeDialog} from "../../Features/DiaLogSlice/openDialogAccountSlide";
import {openDialogChangePass} from "../../Features/DiaLogSlice/openDialogChangePassSlice";
import {useNavigate} from "react-router-dom";
const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DialogAccount() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const openDialogAccount = useSelector((state) => state.Dialog.value)

    const handleClose = () => {
        dispatch(closeDialog(false))
    };

    const handleChangePass = () => {
        dispatch(openDialogChangePass(true))
        dispatch(closeDialog(false))
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openDialogAccount}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    My Account
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography>
                        Doi thong tin nguoi dung
                        <Typography>
                            <Button variant="outlined" color="success" align='right' size="small"
                                    onClick={()=> {
                                        dispatch(closeDialog(false))
                                        navigate('/my-account/change-profile')
                                    }}>Change Profile</Button>
                        </Typography>
                    </Typography>

                    <Typography>
                        Doi mat khau
                        <Typography>
                            <Button variant="outlined" color="success" align='right' size="small"
                                    onClick={handleChangePass}>Change Password</Button>
                        </Typography>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        SIGN OUT
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
