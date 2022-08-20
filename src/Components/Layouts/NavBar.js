import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import {styled, alpha} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import {useDispatch, useSelector} from "react-redux";
import {addClick} from "../../Features/SidebarOpenSlice/clickSlice";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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

function NavBar({children}) {
    const dispatch = useDispatch()
    const open = useSelector((state) => state.Layout.value)
    // const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        dispatch(
            addClick(
                !open
            )
        )
        // setOpen(!open);
    };

    // thanh dropDow
    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    bgcolor: 'white',
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '100px',
                        ...(open && {display: 'none'}),
                    }}
                >
                    <MenuTwoToneIcon sx={{bgcolor: '#757575'}}/>
                </IconButton>

                {/*<IconButton>*/}
                    <Button
                        id="demo-customized-button"
                        aria-controls={opens ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={opens ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon/>}
                    >
                        Total
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={opens}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disableRipple>
                            <LanguageIcon/>
                            Total
                        </MenuItem>

                        <Divider sx={{my: 0.5}}/>
                        <MenuItem onClick={handleClose} disableRipple>
                            <AccountBalanceWalletIcon/>
                            Thangbui
                        </MenuItem>

                    </StyledMenu>
                {/*</IconButton>*/}
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    align='right'
                    sx={{flexGrow: 1}}
                >
                    {children}
                </Typography>

            </Toolbar>
        </AppBar>
    )
}

export default NavBar