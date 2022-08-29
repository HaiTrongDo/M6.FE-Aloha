import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {FormControl, FormControlLabel, Grid, InputLabel, Snackbar} from "@mui/material";
import Alert from '@mui/material/Alert';
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {closeDialogNewCategory} from "../../../Features/DiaLogSlice/openDialogNewCategorySlice";
import {useState} from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DialogIconCategory from "./DialogIconCategory";
import {useNavigate} from "react-router-dom";
import {
    openDialogIconCategory
} from "../../../Features/DiaLogSlice/openDialogIconCategorySlice";
import Typography from "@mui/material/Typography";
import axios from "../../../axios";
import {setDataCategory} from "../../../Features/DiaLogSlice/dataCategorySlice";
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function DialogNewCategory() {
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false); //bat tat alert thong bao
    const[messageSuccsess,setMessageSuccsess] = useState('')
    const[messageErr,setMessageErr] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('EXPENSE')
    const dispatch = useDispatch()
    const openDialogNewCategory = useSelector((state) => state.DialogNewCategory.value)
    const handleClose = () => {
        dispatch(closeDialogNewCategory(false))
        setMessageErr('')
    }

    const iconButton = useSelector((state) => state.SelectIcon.value)
    const handleIcon = () => {
        dispatch(openDialogIconCategory(true))
    }
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangeType = (e) => {
        console.log(e.target.value)
        setType(e.target.value)
    }
//tat alert

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {
            type: type,
            name: name,
            icon: iconButton
        }
        try {
            let token = JSON.parse(localStorage.getItem('JWT')) //lay token o trong localra
            await axios.post('/category/add',
                body, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then((r) => {
                console.log(r)
                setName('');
                setType('EXPENSE')
                setMessageSuccsess(r.data.message)
                setOpen(true);
                dispatch(setDataCategory(r.data.data))
                dispatch(closeDialogNewCategory(false))
                setMessageErr('')

            }).catch(err => {
                setMessageErr(err.response.data.message)
                console.log(err.response.data)
            })
        } catch (err) {
            console.log(err.response)
        }
    }
    console.log(open,'123')


    return (
        <div>
            <Dialog
                open={openDialogNewCategory}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth='400px'
            >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '100%'},
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <DialogTitle>{"New Category"}</DialogTitle>
                    <DialogContent >
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Button align='center' onClick={handleIcon}
                                        sx={{ml: 2, mt: 1}} variant="outlined"
                                >
                                    {iconButton === '' ?
                                        <HelpOutlineIcon sx={{width: 60, height: 60, color: '#9e9e9e'}}/> :
                                        <img style={{width: '60px'}} src={iconButton}/>}
                                </Button>
                                <Typography align='center' variant='h6'>Select Icon</Typography>

                                <DialogIconCategory/>


                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    value={name}
                                    placeholder="Name"
                                    sx={{color: '#9e9e9e'}}
                                    onChange={handleChangeName}
                                />

                                <FormControl sx={{width: '100%'}}>
                                    <InputLabel id='demo-simple-select-label' htmlFor="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={type}
                                        label="Type"
                                        onChange={(e) => handleChangeType(e)}
                                        sx={{color: '#9e9e9e', ml:1}}
                                    >
                                        <MenuItem value={'EXPENSE'}>Expense</MenuItem>
                                        <MenuItem value={'INCOME'}>Income</MenuItem>
                                    </Select>
                                </FormControl>
                                {messageErr && <span className='text-red-700'>{messageErr}</span>}

                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button sx={{color: '#388e3c'}} type='submit'>ADD</Button>
                        <Button sx={{color: 'red'}} onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                        {messageSuccsess}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>

    );
}
