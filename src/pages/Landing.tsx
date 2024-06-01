import { Box, Stack, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import LandingBar from '../components/LandingBar';
import { TryOut } from '../components/TryOut';
import { Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '../firebase';

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
            <Box sx={{ px: { xs: 0, md: 2}, pt: 2 }}>
                {children}
            </Box>
        )}
        </div>
    );
}

const Landing = () => {
    const [page, setPage] = useState(0); 
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (res: any)=>{
            if(res?.accessToken){
                navigate('home')
            } else{
                setLoading(false);
            }
        })
    },[])
  return (
    loading ? <Stack sx={{ display: 'flex', height:'100vh', alignItems:'center', justifyContent: 'center'}}><CircularProgress size={80}/></Stack> : 
    <Box>
        <LandingBar setPage={setPage} page={page}/>
        <TabPanel value={page} index={0}>
            <TryOut/>
        </TabPanel>
        <TabPanel value={page} index={1}>
            <Typography > pg2</Typography>
        </TabPanel>
    </Box>
  )
}

export default Landing