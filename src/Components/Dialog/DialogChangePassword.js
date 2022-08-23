import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {useDispatch, useSelector} from "react-redux";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {closeDialog} from "../../Features/DiaLogSlice/openDialogAccountSlide";
import {closeDialogChangePass} from "../../Features/DiaLogSlice/openDialogChangePassSlice";
import Box from "@mui/material/Box";
import {useState} from "react";
import axios from "../../axios/index";

export default function DialogChangePassword() {
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const dispatch = useDispatch()
    const openDialogChangePass = useSelector((state) => state.DialogPass.value)

    const handleCloseChangePass = () => {
        dispatch(closeDialogChangePass(false))
    };

    const handleChange = (e, field) => {
        data[field] = e.target.value
        setData({...data})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(closeDialogChangePass(false))
        const body = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
        }
        console.log(body)
        let token = JSON.parse(localStorage.getItem('token'))
        console.log(token)
        await axios.post('auth/change-password',
            body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

    }
    return (
        <div>
            <Dialog open={openDialogChangePass}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="oldPassword"
                            label="Old Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(e) => handleChange(e, 'oldPassword')}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="newPassword"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(e) => handleChange(e, 'newPassword')}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(e) => handleChange(e, 'confirmPassword')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChangePass}>Cancel</Button>
                        <Button type="submit">Change</Button>
                    </DialogActions>

                </Box>

            </Dialog>
        </div>
    );
}
