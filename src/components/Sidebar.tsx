import { Box, Tabs, Tab, Hidden } from "@mui/material";
import React, { useState } from "react";
import KitchenIcon from '@mui/icons-material/Kitchen';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';

type PageProp = {
    setPage: React.Dispatch<React.SetStateAction<any>>
    page?: number
    loggedIn?: boolean
}

function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

export function Sidebar({ setPage, page} : PageProp ) {
 
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPage(newValue);
    }

    return (
        <Box
            sx={{ bgcolor: 'background.paper', display: 'flex', alignItems: 'center', height: '100%', position: 'sticky', top: '10px'}}
            >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={page}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', minWidth: {xs:'50px',md:'auto'} }}
            >
                <Tab icon={<KitchenIcon/>} label={<Hidden mdDown>Recipes</Hidden>} iconPosition="end" sx={{minWidth:{xs:'50px',md:'auto'}, paddingRight:{ xs: 3} }} {...a11yProps(0)} />
                <Tab icon={<MenuBookIcon/>} label={<Hidden mdDown>Restaurants</Hidden>} iconPosition="end" sx={{ minWidth: {xs:'50px',md:'auto'}, paddingRight:{ xs: 3} }} {...a11yProps(1)} />
                <Tab icon={<FavoriteIcon/>} label={<Hidden mdDown>Favorites</Hidden>} iconPosition="end" sx={{ minWidth:{xs:'50px',md:'auto'}, paddingRight:{ xs: 3} }} {...a11yProps(2)} />
            </Tabs>
        </Box>
    )
}

