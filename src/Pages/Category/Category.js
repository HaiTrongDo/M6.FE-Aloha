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
import axios from "axios";
import {Card, CardContent, Collapse, Grid} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {styled,alpha} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';



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
    //the hien ra khi bam button
    const [checked, setChecked] = React.useState(false);
    const [category,setCategory] = useState({})
    const handleChange = (type,name,icon) => {
        setChecked(true);
        setCategory({type,name,icon})
    };
    const handleClose = () => {
        setChecked(false);
    }
    const [data, setData] = useState([])
// thanh dropDow
    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseNav = () => {
        setAnchorEl(null);
    };
    //
    async function getAllProduct() {
        let token = JSON.parse(localStorage.getItem('JWT'))
        return await axios.get('http://localhost:8080/category',
            {headers: {Authorization: `Bearer ${token}`}})
    }

    useEffect(() => {
            getAllProduct()
                .then((r) => {
                    setData(r.data.data)
                })
        }, []
    )
    console.log(data)


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
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                        <Typography variant="h6" color='black' component="div" sx={{flexGrow: 1}}>
                            Categories
                        </Typography>
                        <Button variant="soft" color="neutral" sx={{color:'black'}}>New Category</Button>

                        <Button
                            id="demo-customized-button"
                            aria-controls={opens ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={opens ? 'true' : undefined}
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon sx={{color:'black'}}/>}
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
                            <MenuItem onClick={handleCloseNav} disableRipple>
                                <LanguageIcon/>
                                Total
                            </MenuItem>

                            <Divider sx={{my: 0.5}}/>
                            <MenuItem onClick={handleCloseNav} disableRipple>
                                <AccountBalanceWalletIcon/>
                                Thangbui
                            </MenuItem>

                        </StyledMenu>

                    </Toolbar>
                </AppBar>
            </Box>

            //2 the grid danh sach
            <Box sx={{flexGrow: 1}}>
                <Grid container
                      spacing={0}
                      alignItems="center"
                      justifyContent="center"
                      style={{minHeight: '100vh'}}
                >
                    <Grid xs={6} md={4}>
                        <Box
                            sx={{width: 450, backgroundColor: '#e0e0e0'}}
                        >
                            <Typography sx={{mt: 10}}>
                                <Typography sx={{bgcolor: '#eeeeee'}}>
                                    Expense
                                </Typography>
                                <Divider/>
                                {data.map((item) => (
                                    <div key={item._id}>
                                        {item.type == 'EXPENSE' &&
                                            <>
                                                <Button onClick={() => handleChange(item.type,item.name,item.icon)}
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
                                                <Button onClick={() =>handleChange(item.type,item.name,item.icon)}
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

                    </Grid>
                    <Grid xs={6} md={4}>
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
                                            <Card sx={{minWidth: 500,  bgcolor:'#eeeeee'}}>
                                                <Button onClick={handleClose}>
                                                    <CloseIcon/>
                                                </Button>
                                                <Typography component="span" sx={{fontWeight: 'bold', fontSize: 23}}>Category
                                                    details</Typography>
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
                    </Grid>

                </Grid>
            </Box>
        </div>
    )
}

export default Category