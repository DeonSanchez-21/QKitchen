import { Alert, Button, Collapse, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Stack } from "@mui/system";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import type { FormEvent } from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { Navigate } from "react-router-dom";
import { RegisterAPI } from "../utils/api/AuthAPI";

export function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [err, setErr] = useState('');
    const [alert, setAlert] = useState(false)
    const [madeUser, setMadeUser] = useState(false);
    const [credentails, setCredentials] = useState({});

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, name } = e.target as typeof e.target & {
            email: { value: string }
            password: { value: string }
            name: { value: string }
        }
        
        try {
            const res: any = await RegisterAPI( email.value, password.value);
            console.log(res);
            if(res != null) setMadeUser(true)
            await setDoc(doc(db, "userInfo", res.user.uid), 
                {
                    nutrition: {
                        diet: "",
                        userName: "",
                        hash: "",
                        dailyMealPlan: {
                            
                        },

                    }, 
                    fitness: {

                    }
                }
            );
            
        } catch (err : any) {
            setErr(err)
            setAlert(true)
            console.log(err)
            
        }
    }
    
    if (madeUser!= false) return  <Navigate to='/login' />
    
    useEffect(() => {
        onAuthStateChanged(auth, (res: any)=>{
            if(res?.accessToken){
                console.log(res.accessToken)
                return <Navigate to='home'/>
            }
        })
    },[])

    return (
        <>
            <Typography padding={2} variant="h5">Create Account</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Collapse in={alert}>
                        <Alert severity="error">Cannot create account!</Alert>
                    </Collapse>
                    <TextField id='name' label='name' variant="outlined" size="small"/>
                    <TextField id='email' label='email' variant="outlined" size="small" 
                        onChange={(event) =>
                            setCredentials({ ...credentails, email: event.target.value })
                        }
                    />
                    <FormControl size="small" variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            onChange={(event) =>
                                setCredentials({ ...credentails, password: event.target.value })
                            }
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button type="submit" variant="contained">Create Account</Button>
                </Stack>
            </form>
        </>
    )
}