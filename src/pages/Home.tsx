import { Badge, Box, Container, CssBaseline, Divider, Grid, IconButton, List, Paper,Toolbar, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogContentText} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react'; 
import CircularProgress from '@mui/material/CircularProgress';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth} from "../firebase"
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { MainListItems, secondaryListItems } from "../components/listitems";
import { onAuthStateChanged } from "firebase/auth";
import DashBoard from "./DashBoard";
import HorizontalLinearStepper from "../components/Stepper";


const drawerWidth: number = 240;

function TabPanel(props: any) {
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
            <Typography variant='h4'>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    }
    
    const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
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
    
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
        }),
        },
    }),
    );
    
    // TODO remove, this demo shouldn't need to reset the theme.
    const defaultTheme = createTheme();
    
    export default function Home() {
        const [open, setOpen] = React.useState(false);
        const [openSettings, setOpenSettings] = useState(false)
        const [value, setValue] = React.useState(0);
        const [loading, setLoading] = useState(true);
        const [userId, setUserId] = useState("");
        
        let navigate = useNavigate();
        
        const toggleDrawer = () => {
            setOpen(!open);
        };
        const handleSettingsClose = () => {
            setOpenSettings(false);
          };
        
        useEffect(() => {

            onAuthStateChanged(auth, (res: any)=>{
                if(!res?.accessToken){
                    navigate('/')
                } else{
                    
                    setUserId(res.uid)
                }
            })
        },[])

        useEffect(() => {   
            const getData = async () => {
                const ref = doc(db, 'userInfo', userId)
                const docSnap = await getDoc(ref);
                if (docSnap.exists()) {
                    const mealPlan = docSnap.data().nutrition.diet;
                
                    if (mealPlan === '') {
                        setOpenSettings(true)
                        setLoading(true)
                    } else{
                        setLoading(false)
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            userId !== '' && getData();
        },[userId])
    
        return (
            loading ? (
            <Stack sx={{ display: 'flex', height:'100vh', alignItems:'center', justifyContent: 'center'}}>
                <CircularProgress size={80}/>
                <Dialog open={openSettings}
                onClose={handleSettingsClose}>
                    <DialogTitle id="alert-dialog-title">
                        {"Customize Your Plan"}
                    </DialogTitle>
                    <DialogContent>
                        <HorizontalLinearStepper/>
                    </DialogContent>
                </Dialog>

            </Stack> ): 
            <ThemeProvider theme={defaultTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                        pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                            >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {<MainListItems open={open} value={value} setValue={setValue}/>}
                        <Divider sx={{ my: 1 }} />
                    </List>
                    </Drawer>
                    <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                    >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <TabPanel value={value} index={0}>
                            <DashBoard/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                        {/* <Exercises/> */}
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                        {/* <MealPlan/> */}
                        </TabPanel>
                    </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }