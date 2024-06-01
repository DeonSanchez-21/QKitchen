import { Alert, Button, Collapse, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Stack } from "@mui/system";
import type { FormEvent } from 'react';
import { Navigate } from "react-router-dom";
import { LoginAPI } from "../utils/api/AuthAPI";
import { auth } from "../firebase";

export function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [err, setErr ] = useState('');
    const [ alert, setAlert ] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

   

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const { email, password } = e.target as typeof e.target & {
            email: { value: string }
            password: { value: string }
        }

        try{ 
            const response = await LoginAPI(email.value, password.value)
            console.log(response)

        } catch(error: any) {
            setErr(error)
            setAlert(true)
            console.log(error)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (res: any)=>{
            if(res?.accessToken){
                return <Navigate to='home'/>
            }
        })
    },[])

    return (
        <>
            <Typography padding={2} variant="h5">Login</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Collapse in={alert}>
                        <Alert severity="error">Something went wrong!</Alert>
                    </Collapse>
                    <TextField label='email' id="email" variant="outlined" size="small"/>
                    <FormControl size="small" variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
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
                    <Button type="submit" variant="contained">Login</Button>
                </Stack>
                
            </form>
        </>
    )
}