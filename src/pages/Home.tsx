import { Box, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import React, { useState, useContext, useEffect } from 'react'; 
import { Explore } from "../components/Explore";
import { Favorites } from "../components/Favorites";
import { AuthContext } from "../context/AuthContext"

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
    const [page, setPage] = React.useState(0); 
    const {currentUser} = useContext<any>(AuthContext)

    useEffect(() => {
        if (currentUser !== null) window.localStorage.setItem('currentUser', JSON.stringify(currentUser.uid))
    },[])
    
    return (
        <Box>
            <Navbar page={page} setPage={setPage} />
            <TabPanel value={page} index={0}>
                <Explore/>
            </TabPanel>
            <TabPanel value={page} index={1}>
                {currentUser? <Favorites/> : <Typography>login man</Typography>}
            </TabPanel>
        </Box>
    );
}