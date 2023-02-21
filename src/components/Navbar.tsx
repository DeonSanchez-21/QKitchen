import { AppBar, Container, Toolbar, Typography, Button, Stack, Box, Tooltip, Avatar, IconButton, Tabs, Tab } from "@mui/material";
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";

type PageProp = {
    setPage: React.Dispatch<React.SetStateAction<any>>
    page?: number
}



export function Navbar({ setPage, page } : PageProp ) {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPage(newValue);
    }
    
    const logOut = () => {
        signOut(auth)
        setIsLoggedIn(false);
    }
    if (isLoggedIn === false) return <Navigate to='login'/>

    return (
    <AppBar position="static">
        <Container>
            <Toolbar disableGutters>
                <FastfoodOutlinedIcon fontSize='large' />
                <Typography mr={2} component="a" href="/" variant="h4" sx={{
                    ml: 2,
                    fontSize: 'large',
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                }}>Q-Kitchen</Typography>
                <Tabs textColor="inherit" value={page} onChange={handleChange} sx={{flexGrow: 1}} >
                    <Tab label="Explore" />
                    <Tab label="Favorites" />
                </Tabs>
                <Box>
                    <Tooltip title="logout">
                        <IconButton onClick={logOut}>
                            <Avatar/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    )
}