import { Alert, AlertTitle, Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from 'react'; 
import { Explore } from "../components/Explore";
import { Restaurants } from "../components/Restaurants";
import { Favorites } from "../components/Favorites";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        className='tabpanel'
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: { xs: 1, sm: 1.5, md: 3 }, width: '100%' }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


function LocationCard() {
    return (
        <Box height='85vh' display='flex' alignItems='center' justifyContent='center'>
            <Alert severity="error">
                <AlertTitle> Error</AlertTitle>
                an error has occurred - <strong>loction required!</strong> 
            </Alert>
        </Box>
    )
}

export function Search() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [page, setPage] = useState(0); 
    const {currentUser} = useContext<any>(AuthContext);
    const [long, setLong] = useState<number | null>(null);
    const [lat, setLat] = useState<number | null>(null);
    
    const loggedIn = currentUser ? true : false;

    useEffect(() => {
        if (currentUser !== null) window.localStorage.setItem('currentUser', JSON.stringify(currentUser.uid));
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
        })
        console.log(currentUser)
    },[currentUser])

    const logOut = () => {  
      setIsLoggedIn(false);
    }

    if (isLoggedIn === false) return <Navigate to='/'/>
    
    return (
        <Box sx={{display: 'flex', flexGrow: 1, width: '100%'}}>
            <Sidebar page={page} setPage={setPage} />
            <TabPanel value={page} index={0}>
                <Explore/>
            </TabPanel>
            <TabPanel value={page} index={1}>
                { long === null ? <LocationCard/> : <Restaurants/>}
            </TabPanel>
            <TabPanel value={page} index={2}>
                {currentUser? <Favorites/> : <Box minHeight='90vh' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Button  size="large" variant="contained" onClick={logOut}><Typography >Click Here To Login</Typography></Button></Box>}
            </TabPanel>
        </Box>
    );
}