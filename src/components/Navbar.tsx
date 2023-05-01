import { AppBar, Container, Toolbar, Typography, Button, Stack, Box, Tooltip, Avatar, IconButton, Tabs, Tab } from "@mui/material";
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"

type PageProp = {
    setPage: React.Dispatch<React.SetStateAction<any>>
    page?: number
    loggedIn?: boolean
}

export function Navbar({ setPage, page, loggedIn } : PageProp ) {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const {currentUser} = useContext<any>(AuthContext)
    console.log(currentUser)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPage(newValue);
    }
    
    const logOut = () => {
        signOut(auth)
        setIsLoggedIn(false);
    }
    if (isLoggedIn === false) return <Navigate to='/'/>

    return (
    <AppBar position="static">
        <Container>
            <Toolbar disableGutters>
                <FastfoodOutlinedIcon fontSize='large' />
                <Typography mr={2} variant="h4" sx={{
                    ml: 2,
                    fontSize: 'large',
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                }}>
                    <Link style={{textDecoration: 'none', color:'white'}} to="/home">Q-Kitchen</Link>
                </Typography>
                <Tabs textColor="inherit" value={page} onChange={handleChange} sx={{flexGrow: 1}} >
                    <Tab label="Explore" />
                    <Tab label="Favorites" />
                </Tabs>
                <Stack spacing={1} direction='row'>
                    <Button size="small" color="inherit" variant="text" onClick={logOut}>
                        {loggedIn ? 'logout' : 'login'}
                    </Button>
                    <Avatar sx={{bgcolor: loggedIn ? 'white' : '', color: loggedIn ? '#1976d2' : ''}}>
                        <LocalDiningIcon />
                    </Avatar>
                </Stack>
            </Toolbar>
        </Container>
    </AppBar>
    )
}