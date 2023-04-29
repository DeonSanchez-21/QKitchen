import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Stack } from "@mui/system";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import type { FormEvent } from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { Navigate } from "react-router-dom";

export function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [err, setErr] = useState(false);
    const [madeUser, setMadeUser] = useState(false);

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
            const res = await createUserWithEmailAndPassword(auth, email.value, password.value);
            console.log(res);
            if(res != null) setMadeUser(true)
            await setDoc(doc(db, "favorites", res.user.uid), {recipes: []});
            
        } catch (err) {
            setErr(true)
            console.log(err)
            
        }
    }
    
    if (madeUser!= false) return  <Navigate to='/login' />
    

    return (
        <>
            <Typography padding={2} variant="h5">Create Account</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField id='name' label='name' variant="outlined" size="small"/>
                    <TextField id='email' label='email' variant="outlined" size="small"/>
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
                    <Button type="submit" variant="contained">Create Account</Button>
                </Stack>
            </form>
        </>
    )
}