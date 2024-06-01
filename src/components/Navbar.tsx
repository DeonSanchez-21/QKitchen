import { AppBar, Container, Toolbar, Typography, Button, Stack, Box, Tooltip, Avatar, IconButton, Tabs, Tab } from "@mui/material";
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { signOut } from "firebase/auth";

import { auth } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";

type PageProp = {
    setPage: React.Dispatch<React.SetStateAction<any>>
    page?: number
    loggedIn?: boolean
}

export function Navbar({ setPage, page, loggedIn } : PageProp ) {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPage(newValue);
    }
    
    const logOut = () => {
        signOut(auth)
        setIsLoggedIn(false);
    }
    if (isLoggedIn === false) return <Navigate to='/'/>

    return (
        <AppBar color="secondary" position="static">
            <Container>
                <Toolbar disableGutters>
                    <FastfoodOutlinedIcon color='info' sx={{ display:{ xs:'none', sm:'flex'}}} fontSize='large' />
                    <Typography mr={2} variant="h4" sx={{
                        ml: 2,
                        fontSize: 'large',
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}>
                        <Link style={{textDecoration: 'none', color:'#362417'}} to="/home">Q-Kitchen</Link>
                    </Typography>
                    <Tabs textColor="inherit" value={page} onChange={handleChange} sx={{flexGrow: 1}} >
                        <Tab label="Search" />
                        <Tab label="Meal Planning" />
                    </Tabs>
                    <Stack spacing={1} direction='row'>
                        <Button sx={{ display:{ xs:'none', sm:'flex'}}} size="small" color="inherit" variant="text" onClick={logOut}>
                            {loggedIn ? 'logout' : 'login'}
                        </Button>
                        <Avatar sx={{bgcolor: loggedIn ? 'white' : '', color: loggedIn ? '#1976d2' : ''}}>
                            <LocalDiningIcon color="info"/>
                        </Avatar>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

