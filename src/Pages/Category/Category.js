import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from "@mui/material/Divider";
import {useEffect, useState} from "react";
import axios from "../../axios";
import {Card, CardContent, CardHeader, Collapse, Grid, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {styled, alpha} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DialogNewCategory from "../../Components/Dialog/DialogCategory/DialogNewCategory";
import {useDispatch, useSelector} from "react-redux";
import {closeDialogNewCategory, openDialogNewCategory} from "../../Features/DiaLogSlice/openDialogNewCategorySlice";
import DialogIconCategory from "../../Components/Dialog/DialogCategory/DialogIconCategory";
import {setSelectIcon} from "../../Features/DiaLogSlice/selectIconSlice";
import {setDataCategory} from "../../Features/DiaLogSlice/dataCategorySlice";
import {openDialogUpdateCategory} from "../../Features/DiaLogSlice/openDialogUpdateCategorySlice";
import DialogUpdateCategory from "../../Components/Dialog/DialogCategory/DialogUpdateCategory";
import {setUpdateDataCategory} from "../../Features/DiaLogSlice/updataDataCategorySlice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {useNavigate} from "react-router-dom";


//o dropDow
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function Category() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let tokenUser = JSON.parse(localStorage.getItem('alohaUser')) //lay token o trong localra
    console.log(tokenUser)
    //the hien ra khi bam button
    const [checked, setChecked] = React.useState(false);
    const [category, setCategory] = useState({})
    const [messageSucsess, setMessageSucsess] = useState('')
    const [open, setOpen] = React.useState(false); //bat tat alert thong bao


    const handleChange = (id, type, name, icon) => {
        setChecked(true);
        setCategory({id, type, name, icon})
    };
    const handleClose = () => {
        setChecked(false);
    }

// thanh dropDow
    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseNav = () => {
        setAnchorEl(null);
    };
    //hien dialog new category

    const handleNewCategory = () => {
        dispatch(openDialogNewCategory(true))
        dispatch(setSelectIcon(''))
    }

    //bat edit category
    console.log(category)
    const handleUpdateCategory = () => {
        dispatch(openDialogUpdateCategory(true))
        dispatch(setUpdateDataCategory(category))
        dispatch(setSelectIcon(category.icon))
    }
    //tat alert
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const handleDeleteCategory = async () => {
        try {
            let token = JSON.parse(localStorage.getItem('JWT')) //lay token o trong localra
            await axios.post('/category/delete',  {id:category.id},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then((r) => {
                console.log(r)
                setChecked(false);
                setMessageSucsess(r.data.message)
                setOpen(true);
                dispatch(setDataCategory(r.data.data)) //set data toan bo du lieu tra ve de in ra man hinh


            })
        } catch (err) {
            console.log(err)
        }

    }

    //
    async function getAllProduct() {
        let token = JSON.parse(localStorage.getItem('JWT'))
        return await axios.get('/category',
            {headers: {Authorization: `Bearer ${token}`}})
    }

    useEffect(() => {
            getAllProduct()
                .then((r) => {
                    dispatch(setDataCategory(r.data.data))
                })
        }, []
    )

    const data = useSelector((state) => state.DateCategory.value)


    return (
        <div>
            // navbar
            <Box sx={{flexGrow: 1}}>
                <AppBar position="fixed" sx={{bgcolor: '#e0e0e0'}}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick= {()=>{navigate(-1)}}
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                        <Typography variant="h6" color='black' component="div" sx={{flexGrow: 1}}>
                            Categories
                        </Typography>
                        <Button onClick={handleNewCategory} variant="soft" color="neutral" sx={{color: 'black'}}>New
                            Category</Button>
                        <DialogNewCategory/>

                        <Button
                            id="demo-customized-button"
                            aria-controls={opens ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={opens ? 'true' : undefined}
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon sx={{color: 'black'}}/>}
                            variant="plain"
                        >
                            <img src="https://static.moneylover.me/img/icon/icon.png"
                                 style={{height: 30}}
                            />
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={opens}
                            onClose={handleCloseNav}
                        >
                            <Typography sx={{
                                fontWeight: 'light',
                                fontSize: 13,
                                color: 'black',
                                textAlign: 'left',
                                m:1
                            }} >
                                Included in Total
                            </Typography>
                            <Divider sx={{my: 0.5}}/>
                            <MenuItem disableRipple>
                                <img src="https://static.moneylover.me/img/icon/icon.png"
                                     className='rounded-full w-[35px] h-[35px] object-cover'
                                />
                                <Box sx={{ml:2}}>
                                    <Typography sx={{
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        color: 'black',
                                        textAlign: 'left'
                                    }} >
                                        Trung nguyen
                                    </Typography>
                                    <Typography sx={{
                                        fontWeight: 'light',
                                        fontSize: 12,
                                        color: 'black',
                                        textAlign: 'left'
                                    }}>
                                        +95.000
                                    </Typography>
                                </Box>
                            </MenuItem>

                        </StyledMenu>

                    </Toolbar>
                </AppBar>
            </Box>

            //2 the grid danh sach
            <div className='flex inline relative'>
                <Grid container
                      spacing={0}
                      alignItems="center"
                      justifyContent="center"
                      style={{minHeight: '100vh'}}
                >
                    <div className='w-1/2 flex justify-center'>
                        {/*<Grid xs={6} md={4}>*/}
                        <Box
                            sx={{width: 500, backgroundColor: '#e0e0e0'}}
                        >
                            <Typography sx={{mt: 2}}>
                                <Typography sx={{bgcolor: '#eeeeee'}}>
                                    Expense
                                </Typography>
                                <Divider/>
                                {data.map((item) => (
                                    <div key={item._id}>
                                        {item.type == 'EXPENSE' &&
                                            <>
                                                <Button
                                                    onClick={() => handleChange(item._id, item.type, item.name, item.icon)}
                                                    sx={{width: '100%', justifyContent: 'left'}}>
                                                    <img style={{height: 40}}
                                                         src={item.icon}/>
                                                    <Typography sx={{m: 2}} variant="" color='black'>
                                                        {item.name}
                                                    </Typography>
                                                </Button>
                                                <Divider/>
                                            </>
                                        }
                                    </div>
                                ))}

                                <Typography sx={{bgcolor: '#eeeeee'}}>
                                    Income
                                </Typography>
                                <Divider/>
                                {data.map((item) => (
                                    <div key={item._id}>
                                        {item.type == 'INCOME' &&
                                            <>
                                                <Button
                                                    onClick={() => handleChange(item._id, item.type, item.name, item.icon)}
                                                    sx={{width: '100%', justifyContent: 'left'}}>
                                                    <img style={{height: 40}}
                                                         src={item.icon}/>
                                                    <Typography sx={{m: 2}} variant="" color='black'>
                                                        {item.name}
                                                    </Typography>
                                                </Button>
                                                <Divider/>
                                            </>
                                        }
                                    </div>
                                ))}
                            </Typography>

                        </Box>

                        {/*</Grid>*/}

                    </div>
                    {
                        checked && <div className='w-1/2 flex static '>

                            {/*<Grid xs={6} md={4}>*/}
                            <Box sx={{height: 300}}>
                                <Box
                                    sx={{
                                        '& > :not(style)': {
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            height: 120,
                                            width: 250,
                                        },
                                    }}
                                >

                                    <Box>
                                        <Box sx={{width: '50%'}}>
                                            <Collapse orientation="horizontal" in={checked}>
                                                <Card position="fixed" sx={{minWidth: 500, bgcolor: '#eeeeee'}}>
                                                    <CardHeader sx={{height: '50px'}}
                                                                avatar={
                                                                    <Button onClick={handleClose}>
                                                                        <CloseIcon/>
                                                                    </Button>
                                                                }

                                                                action={
                                                                    <>
                                                                        <Button onClick={handleUpdateCategory}
                                                                                variant="text" sx={{
                                                                            fontWeight: 'medium',
                                                                            fontSize: 16,
                                                                            mb: 4,
                                                                            color: 'success',
                                                                        }}>
                                                                            EDIT
                                                                        </Button>
                                                                        <Button
                                                                            onClick={handleDeleteCategory}
                                                                            variant="text" sx={{
                                                                            fontWeight: 'medium',
                                                                            fontSize: 16,
                                                                            color: 'red',
                                                                            mb: 4
                                                                        }}>
                                                                            DELETE
                                                                        </Button>
                                                                    </>
                                                                }
                                                                title={<Typography component="span"
                                                                                   sx={{fontWeight: 'bold', fontSize: 23}}>Category
                                                                    details</Typography>
                                                                }

                                                    />
                                                    <DialogUpdateCategory/>


                                                    <Divider/>
                                                    <CardContent>
                                                        <img style={{height: 65, float: "left", marginRight: '30px'}}
                                                             src={category.icon}/>
                                                        <Box>
                                                            <Typography sx={{fontWeight: 'medium', fontSize: 20}}
                                                                        color='black'>
                                                                {category.name}
                                                            </Typography>
                                                            <Box sx={{fontSize: 12}}>{category.type}</Box>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Collapse>
                                        </Box>

                                    </Box>
                                </Box>
                            </Box>
                            {/*</Grid>*/}
                        </div>
                    }
                </Grid>
            </div>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%'}}>
                        {messageSucsess}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}

export default Category