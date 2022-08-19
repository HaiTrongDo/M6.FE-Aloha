import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';


export const mainListItems = (
    <React.Fragment>
        <ListItemButton href='/'>
            <ListItemIcon>
                <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
        </ListItemButton>

        <ListItemButton href='/add'>
            <ListItemIcon>
                <CollectionsBookmarkIcon  />
            </ListItemIcon>
            <ListItemText primary="Report"/>
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Budget" />
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <LocalGroceryStoreIcon />
            </ListItemIcon>
            <ListItemText primary="Store" />
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
        </ListItemButton>

    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <PersonIcon  />
            </ListItemIcon>
            <ListItemText primary="My Account" />
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="My Wallets" />
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
        </ListItemButton>
    </React.Fragment>
);