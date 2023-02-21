import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Stack } from "@mui/system";
import { auth } from "../firebase";
import type { FormEvent } from 'react';
import { Navigate } from "react-router-dom";

export function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [err, setErr ] = useState(false);
    const [ user, setUser ] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    if (user!= false) return  <Navigate to='/' />

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const { email, password } = e.target as typeof e.target & {
            email: { value: string }
            password: { value: string }
        }

        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            user ? setUser(true) : setUser(false);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <>
            <Typography padding={2} variant="h5">Login</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
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