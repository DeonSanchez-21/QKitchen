import { Box, Button, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import React, { useState, useContext, useEffect } from 'react'; 
import { Explore } from "../components/Explore";
import { Favorites } from "../components/Favorites";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
        )}
        </div>
    );
}

export function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [page, setPage] = useState(0); 
    const {currentUser} = useContext<any>(AuthContext)
    
    const loggedIn = currentUser ? true : false;

    useEffect(() => {
        if (currentUser !== null) window.localStorage.setItem('currentUser', JSON.stringify(currentUser.uid))
    },[])

    const logOut = () => {
        
        setIsLoggedIn(false);
    }

    if (isLoggedIn === false) return <Navigate to='/'/>
    
    return (
        <Box>
            <Navbar page={page} setPage={setPage} loggedIn={loggedIn} />
            <TabPanel value={page} index={0}>
                <Explore/>
            </TabPanel>
            <TabPanel value={page} index={1}>
                {currentUser? <Favorites/> : <Box minHeight='90vh' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Button  size="large" variant="contained" onClick={logOut}><Typography >Click Here To Login</Typography></Button></Box>}
            </TabPanel>
        </Box>
    );
}