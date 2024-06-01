import { Box } from "@mui/system";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { FullScreenCard } from "../../components/FullScreenCard";
import "../../App.css"
import { Button, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { GoogleSignInAPI } from "../../utils/api/AuthAPI";
import { doc, setDoc } from "firebase/firestore";

export function AuthLayout() {
    const location = useLocation();
    const inLogin = location.pathname === '/login';
    const [err, setErr] = useState('');
    const [alert, setAlert] = useState(false)
    const [email, setEmail] = useState<string | null>('')

    const handleGoogleLogin = async () => {
        try {
            const res: any = await GoogleSignInAPI();
            await console.log(res)
            await setDoc(doc(db, "userInfo", res.user.uid), { 
                nutrition: {
                    diet: "",
                    userName: "",
                    hash: "",
                    dailyMealPlan: {
                        
                    },

            }, 
            fitness: {

            }});
            
        } catch (err : any) {
            setErr(err)
            setAlert(true)
            console.log(err)
            
        }
    }

    useEffect(() => {
        setEmail(localStorage.getItem('email'))
    },[email])

    // if (email!= '') return  <Navigate to="/home"/>
    return (
    <FullScreenCard>
        <FullScreenCard.AboveCard>
            <Stack>
                <Button variant="contained" onClick={handleGoogleLogin}>{inLogin ? 'login' : 'signup'} with Google</Button>
            </Stack>
            <Divider sx={{m: 2}}>or</Divider>
        </FullScreenCard.AboveCard>
        <FullScreenCard.Body>
            <Outlet/>
        </FullScreenCard.Body>
        <FullScreenCard.BelowCard>
            <Box className='center'>
                <Link to={inLogin ? '/signup' : '/login'}>
                    {inLogin ? 'Create Account' : 'Login'}
                </Link>
            </Box>
        </FullScreenCard.BelowCard>
    </FullScreenCard>
    )
}