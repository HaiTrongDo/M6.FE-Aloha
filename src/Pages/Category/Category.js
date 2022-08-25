import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from "@mui/material/Divider";
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardActions, CardContent, Collapse, Grid} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';


function Category() {
    //the hien ra khi bam button
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked(true);
    };
    const handleClose = () => {
        setChecked(false);
    }
    console.log(checked)
    const [data, setData] = useState([])

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
                        <Button color="inherit">Login</Button>
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
                                                <Button onClick={handleChange}
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
                                                <Button onClick={handleChange}
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
                                    <Box sx={{width: '50%'}} >
                                        <Collapse orientation="horizontal" in={checked}>
                                            <Card sx={{minWidth: 500}}>
                                                <Button onClick={handleClose}>
                                                    <CloseIcon/>
                                                </Button>
                                                <Typography component="span" sx={{fontWeight: 'bold', fontSize: 23 }}>Category
                                                    details</Typography>
                                                <Divider/>
                                                <CardContent>
                                                    <img style={{height: 65, float:"left", marginRight: '30px'}}
                                                         src='https://static.moneylover.me/img/icon/ic_category_foodndrink.png'/>
                                                    <Box>
                                                        <Typography  sx={{fontWeight: 'medium', fontSize: 20 }} color='black'>
                                                            Food & V=Beverage
                                                        </Typography>
                                                        <Box>Thang bui</Box>
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